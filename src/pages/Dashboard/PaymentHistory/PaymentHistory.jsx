import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [allPayments, setAllPayments] = useState([]);
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      setAllPayments(res.data);
      return res.data;
    },
    queryKey: ["payment-data"],
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      style={{ boxShadow: "2px 2px 20px #00000033" }}
      className="w-[95%] mt-5 md:mt-10 mx-auto p-3 rounded-md"
    >
      <div className="w-full  text-center text-2xl md:text-3xl">
        <p className="mb-5 font-medium">Payment History</p>
      </div>

      <div className=" ">
        {/* table */}
        <div className="overflow-x-auto mt-12">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-neutral bg-neutral-300">
                <th>Camp Name</th>
                <th>Camp Fee</th>
                <th>Payment Status</th>
                <th>Confirmation Status</th>
                <th>Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {allPayments.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.campName}</td>
                  <td>$ {payment.fees}</td>
                  <td>
                    <span
                      className={` px-2 py-1 rounded-md ${
                        payment.paymentStatus ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {payment.paymentStatus ? "Paid" : "Pay"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={` px-2 py-1 rounded-md ${
                        payment.confirmationStatus === "confirmed"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {payment.confirmationStatus === "confirmed"
                        ? "Confirmed"
                        : "Pending"}
                    </span>
                  </td>
                  <td>
                    {moment(payment.transactionDate).format(
                      "DD-MM-YYYY, h:mm a"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
