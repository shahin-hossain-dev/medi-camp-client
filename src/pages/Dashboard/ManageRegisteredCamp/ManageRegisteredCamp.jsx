import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAlert from "../../../hooks/useAlert";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Search from "../../../components/Search/Search";
import PageOfShow from "../../../components/PageOfShow/PageOfShow";
import NotFound from "../../../components/NotFound/NotFound";

const ManageRegisteredCamp = () => {
  const [allCamps, setAllCamps] = useState([]);
  const axiosSecure = useAxiosSecure();
  const alert = useAlert();
  const [count, setCount] = useState(0);
  const [itemsPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const numberOfPage = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPage).keys()];

  // useEffect(() => {
  //   const count = async () => {
  //     const res = await axiosSecure.get(`/campCount?email=${user?.email}`);
  //     setCount(res.data.count);
  //   };
  //   count();
  // }, [axiosSecure, user?.email]);
  const { data: counts } = useQuery({
    queryKey: ["count", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get("/registered-camp-count");
      setCount(res.data.count);
      return res.data.count;
    },
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["registeredCamp", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/registered-camps?page=${currentPage}&size=${itemsPerPage}`
      );
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
        refetch();
      }
    },
  });

  const handleConfirm = (id) => {
    Swal.fire({
      title: "Are you confirm it?",
      text: "You won't be able to revert it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm it!",
      background: "linear-gradient(to left top, #0066b2, #003d6b)",
      color: "White",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.put(`/confirm-camp/${id}`);
        if (res.data.modifiedCount > 0) {
          alert("Confirmed!", "success");
          refetch();
        }
      }
    });
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
        <p className="mb-5 font-medium">Registered Camps</p>
      </div>
      {/* search bar */}
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
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {allCamps.map((camp) => (
                <tr key={camp._id}>
                  <td>{camp.participantName}</td>
                  <td>{camp.campName}</td>
                  <td>$ {camp.fees}</td>

                  <td>
                    <span
                      className={` px-2 py-1 rounded-md ${
                        camp.paymentStatus ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {camp.paymentStatus ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleConfirm(camp._id)}
                      disabled={
                        camp.confirmationStatus === "confirmed" ||
                        !camp.paymentStatus
                      }
                      className={` px-2 py-1 rounded-md ${
                        camp.confirmationStatus === "confirmed"
                          ? "bg-green-100"
                          : "bg-red-100 disabled:text-gray-500"
                      }`}
                    >
                      {camp.confirmationStatus === "confirmed"
                        ? "Confirmed"
                        : "Pending"}
                    </button>
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
                </tr>
              ))}
            </tbody>
          </table>
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
          allCamps={allCamps}
          count={count}
        />
      </div>
    </div>
  );
};

export default ManageRegisteredCamp;
