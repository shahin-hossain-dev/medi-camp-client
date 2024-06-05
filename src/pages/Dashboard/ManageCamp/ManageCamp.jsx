import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAlert from "../../../hooks/useAlert";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";

const ManageCamp = () => {
  const { user } = useAuth();
  const [allCamps, setAllCamps] = useState([]);
  const axiosSecure = useAxiosSecure();
  const alert = useAlert();

  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get(`/organizer-camp?email=${user?.email}`);
      setAllCamps(res.data);
      return res.data;
    },
    queryKey: ["applied-data"],
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/camp-delete/${id}`);
      return res.data;
    },
    onSuccess: (res) => {
      if (res.deletedCount > 0) {
        alert("Deleted Camp!", "success");
        refetch();
      }
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutateAsync(id);
      }
    });
    // const remainingJobs = data.filter();
    // console.log(id);
    // setAllJobs(remainingJobs);
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
        <p className="mb-5 font-medium">All Camps</p>
      </div>

      <div className=" ">
        {/* table */}
        <div className="overflow-x-auto mt-12">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-neutral">
                <th>Camp Name</th>
                <th>Date & Time</th>
                <th>Location</th>
                <th>Healthcare Professional</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {allCamps.map((camp) => (
                <tr key={camp._id}>
                  <td>{camp.campName}</td>
                  <td>
                    <span>
                      {moment(camp.dateAndTime).format("DD-MM-YYYY hh:mm a")}
                    </span>{" "}
                  </td>
                  <td>{camp.location}</td>
                  <td>{camp.healthcareProfessional}</td>
                  <td>
                    <div className="flex gap-3">
                      <Link to={`/dashboard/update-camp/${camp._id}`}>
                        <FaEdit className="text-2xl text-warning hover:rotate-180 duration-300 hover:duration-300" />
                      </Link>
                      <button onClick={() => handleDelete(camp._id)}>
                        <FaRegTrashCan className="text-2xl text-error hover:rotate-180 duration-300 hover:duration-300" />
                      </button>
                    </div>
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

export default ManageCamp;
