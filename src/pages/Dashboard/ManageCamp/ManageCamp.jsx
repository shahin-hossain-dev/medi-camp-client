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
import Search from "../../../components/Search/Search";
import NotFound from "../../../components/NotFound/NotFound";
import PageOfShow from "../../../components/PageOfShow/PageOfShow";

const ManageCamp = () => {
  const { user } = useAuth();
  const [allCamps, setAllCamps] = useState([]);
  const axiosSecure = useAxiosSecure();
  const alert = useAlert();
  const [count, setCount] = useState(0);
  const [itemsPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const numberOfPage = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPage).keys()];

  const { data: counts } = useQuery({
    queryKey: ["count", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/organizer-camp-count?email=${user?.email}`
      );
      setCount(res.data.count);
      return res.data.count;
    },
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["organizerCamp", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/organizer-camp?email=${user?.email}&page=${currentPage}&size=${itemsPerPage}`
      );
      setAllCamps(res.data);
      return res.data;
    },
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
      background: "linear-gradient(to left top, #0066b2, #003d6b)",
      color: "White",
    }).then((result) => {
      if (result.isConfirmed) {
        mutateAsync(id);
      }
    });
  };

  // pagination handles
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
        <p className="mb-5 font-medium">All Camps</p>
      </div>
      {/* Search */}
      <Search data={data} setAllCamps={setAllCamps} />
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
          {/* result not found */}
          <NotFound result={allCamps.length} />
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
          allCamps={data}
          count={count}
        />
      </div>
    </div>
  );
};

export default ManageCamp;
