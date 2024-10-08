import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAlert from "../../../hooks/useAlert";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { VscFeedback } from "react-icons/vsc";
import FeedbackModal from "../../../components/Modals/FeedbackModal";
import "./registerCamp.css";
import Search from "../../../components/Search/Search";
import NotFound from "../../../components/NotFound/NotFound";
import PageOfShow from "../../../components/PageOfShow/PageOfShow";

const RegisteredCamps = () => {
  const { user } = useAuth();
  const [allCamps, setAllCamps] = useState([]);
  const [feedback, setFeedback] = useState({});
  const axiosSecure = useAxiosSecure();
  const alert = useAlert();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [itemsPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const numberOfPage = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPage).keys()];
  // console.log(count / itemsPerPage);
  // useEffect(() => {
  //   const count = async () => {
  //     const res = await axiosSecure.get(`/campCount?email=${user?.email}`);
  //     setCount(res.data.count);
  //   };
  //   count();
  // }, [axiosSecure, user?.email]);
  const { data: counts } = useQuery({
    queryKey: ["count", currentPage, allCamps],
    queryFn: async () => {
      const res = await axiosSecure.get(`/campCount?email=${user?.email}`);
      setCount(res.data.count);
      return res.data.count;
    },
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axiosSecure.get(
  //       `/participant-camps?email=${user?.email}&page=${currentPage}&size=${itemsPerPage}`
  //     );
  //     setAllCamps(res.data);
  //   };
  //   fetchData();
  // }, [axiosSecure, currentPage, itemsPerPage, user?.email]);

  // --------------------pagination---------------------

  const { data, isLoading } = useQuery({
    queryKey: ["applied-data", currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/participant-camps?email=${user?.email}&page=${currentPage}&size=${itemsPerPage}`
      );
      // console.log(res.data);
      setAllCamps(res.data);
      return res.data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/camp-cancel/${id}`);
      return res.data;
    },
    onSuccess: (res) => {
      if (res.deletedCount > 0) {
        alert("Cancel Camp Successfully", "success");
        // refetch();
      }
    },
  });

  const handlePayment = (id) => {
    navigate("/dashboard/payment", { state: { id } });
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "linear-gradient(to left top, #0066b2, #003d6b)",
      color: "White",
    }).then((result) => {
      if (result.isConfirmed) {
        mutateAsync(id);
      }
    });
  };
  const handleFeedbackModal = (camp) => {
    const { campName, campId, _id } = camp;
    const feedbackInfo = {
      campName,
      campId,
      registeredId: _id,
    };
    setFeedback(feedbackInfo);
    document.getElementById("feedback-modal").showModal();
  };

  // pagination area ---------------->
  const handlePage = (page) => {
    setCurrentPage(page);
  };
  const handlePrevButton = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
    // refetch();
  };
  const handleNextButton = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
    // refetch();
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
        <p className="mb-5 font-medium">Registered Camps</p>
      </div>
      <Search data={data} setAllCamps={setAllCamps} />
      <div className=" ">
        {/* table */}
        <div className="overflow-x-auto mt-12">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-neutral bg-neutral-300">
                <th>Participant Name</th>
                <th>Camp Name</th>
                <th>Camp Fee</th>
                <th>Payment Status</th>
                <th>Confirmation Status</th>
                <th>Cancel</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {allCamps.map((camp) => (
                <tr key={camp._id}>
                  <td>{camp.campName}</td>
                  <td>$ {camp.fees}</td>
                  <td>{camp.participantName}</td>

                  <td>
                    <button
                      onClick={() => handlePayment(camp._id)}
                      className={` px-2 py-1 rounded-md  ${
                        camp.paymentStatus ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {camp.paymentStatus ? "Paid" : "Pay"}
                    </button>
                  </td>
                  <td>
                    <span
                      className={` px-2 py-1 rounded-md ${
                        camp.confirmationStatus === "confirmed"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {camp.confirmationStatus === "confirmed"
                        ? "Confirmed"
                        : "Pending"}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-3">
                      <button
                        disabled={
                          camp.paymentStatus ||
                          camp.confirmationStatus === "confirmed"
                        }
                        className="disabled:text-gray-500 text-error"
                        onClick={() => handleCancel(camp._id)}
                      >
                        <FaRegTrashCan
                          className={`text-2xl   hover:rotate-180 duration-300 hover:duration-300`}
                        />
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleFeedbackModal(camp)}
                      disabled={
                        camp.paymentStatus !== true ||
                        camp.confirmationStatus !== "confirmed"
                      }
                      className="disabled:text-gray-500 text-[#003d6b]"
                    >
                      <VscFeedback
                        className={`text-2xl  inline me-1 hover:scale-125 active:scale-100 ac duration-300 hover:duration-300`}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* result not found */}
          <NotFound result={allCamps.length} />
        </div>
      </div>
      <FeedbackModal feedback={feedback} />
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
        {/* todo: count page */}
        <PageOfShow
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          allCamps={allCamps}
          count={count}
        />
      </div>
    </div>
  );
};

export default RegisteredCamps;
