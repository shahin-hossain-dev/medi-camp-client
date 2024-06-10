import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAlert from "../../../hooks/useAlert";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const CheckoutForm = ({ campId }) => {
  const [error, setError] = useState("");
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const alert = useAlert();

  //   const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const {
    data: camp,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["paymentCamp"],
    queryFn: async () => {
      const res = await axiosSecure(`/registered-camp/${campId}`);
      // console.log(res.data);
      return res.data;
    },
  });

  useEffect(() => {
    if (camp?.fees > 0) {
      axiosSecure
        .post("/create-payment-intent", {
          pay: camp?.fees,
        })
        .then((res) => {
          // console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, camp?.fees]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Payment Error", error);
      setError(error.message);
    } else {
      // console.log("Payment Method", paymentMethod);
      setError("");
    }

    // confirm payment

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.name || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError);
    } else {
      // console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // console.log("transaction Id:", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save payment info in the database
        const payment = {
          campName: camp?.campName,
          fees: camp?.fees,
          email: user?.email,
          transactionId: paymentIntent.id,
          transactionDate: new Date(), // utc date convert using moment js
          registeredId: camp?._id,
          campId: camp?.campId,
          paymentStatus: true,
        };

        const res = await axiosSecure.post(`/payments/${camp._id}`, payment);
        // console.log("payment saved", res.data);

        if (res.data?.insertedId) {
          navigate("/dashboard/payment-history", {
            state: { transactionId: paymentIntent.id },
          });
          alert(`Thank You For Joining`, "success");
        }
        refetch();
      }
    }
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className=" min-h-screen flex justify-center items-center">
      <div className="min-w-[400px] mx-auto shadow-2xl p-5 border">
        <h3 className="text-center text-2xl mb-3">Payment</h3>
        <div className="space-y-2 mb-5 text-gray-400">
          <p className="font-medium">Camp: {camp?.campName}</p>
          <p>Fee: ${camp?.fees}</p>
          <p>Professional: {camp?.healthcareProfessional}</p>
          <p>Phone: +88 {camp?.phoneNumber}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit "
            className="btn bg-gradient-to-br from-[#0066b2] to-[#003d6b] text-white w-full my-5"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
          <p className="text-red-500">{error}</p>
          {transactionId && (
            <p className="text-green-700">Transaction Id: {transactionId}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
