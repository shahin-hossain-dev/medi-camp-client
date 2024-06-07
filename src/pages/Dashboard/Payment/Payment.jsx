import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

// todo: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const location = useLocation();
  const campId = location?.state?.id;

  return (
    <div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm campId={campId} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
