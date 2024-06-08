import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAlert from "../../../hooks/useAlert";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { VscFeedback } from "react-icons/vsc";
import FeedbackModal from "../../../components/Modals/FeedbackModal";
const RegisteredCamps = () => {
  const { user } = useAuth();
  const [allCamps, setAllCamps] = useState([]);
  const [feedback, setFeedback] = useState({});
  const axiosSecure = useAxiosSecure();
  const alert = useAlert();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/participant-camps?email=${user?.email}`
      );
      setAllCamps(res.data);
      return res.data;
    },
    queryKey: ["applied-data"],
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/camp-cancel/${id}`);
      return res.data;
    },
    onSuccess: (res) => {
      if (res.deletedCount > 0) {
        alert("Cancel Camp Successfully", "success");
        refetch();
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
    // const remainingJobs = data.filter();
    // console.log(id);
    // setAllJobs(remainingJobs);
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
                      className={` px-2 py-1 rounded-md ${
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
        </div>
      </div>
      <FeedbackModal feedback={feedback} />
    </div>
  );
};

export default RegisteredCamps;
