import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";
import Search from "../../../components/Search/Search";
import NotFound from "../../../components/NotFound/NotFound";
import PageOfShow from "../../../components/PageOfShow/PageOfShow";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [allPayments, setAllPayments] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [count, setCount] = useState(0);
  const [itemsPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const numberOfPage = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPage).keys()];

  const { data: counts } = useQuery({
    queryKey: ["count", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/paymentCount?email=${user?.email}`);
      console.log(res.data.count);
      setCount(res.data.count);
      return res.data.count;
    },
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["payment-data", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments?email=${user?.email}&page=${currentPage}&size=${itemsPerPage}`
      );
      setAllPayments(res.data);
      return res.data;
    },
  });

  // pagination area ---------------->
  const handlePage = (page) => {
    setCurrentPage(page);
  };
  const handlePrevButton = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextButton = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

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
      <Search data={data} setAllCamps={setAllPayments} />

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
          {/* result not found */}
          <NotFound result={allPayments.length} />
        </div>
      </div>
      {/* pagination buttons */}
      <div>
        <button
          className="btn  me-2 bg-gradient-to-br from-[#0066b2] to-[#003d6b] text-white"
          onClick={handlePrevButton}
        >
          Prev
        </button>
        {pages.map((page) => (
          <button
            onClick={() => handlePage(page)}
            key={page}
            className={`btn border me-2  ${
              currentPage === page
                ? "bg-gradient-to-br from-[#0066b2] to-[#003d6b] text-white"
                : undefined
            }`}
          >
            {page + 1}
          </button>
        ))}
        <button
          className="btn bg-gradient-to-br from-[#0066b2] to-[#003d6b] text-white me-2"
          onClick={handleNextButton}
        >
          Next
        </button>
        <PageOfShow
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          allCamps={allPayments}
          count={count}
        />
      </div>
    </div>
  );
};

export default PaymentHistory;
