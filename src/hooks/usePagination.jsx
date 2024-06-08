import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const usePagination = ({ count, itemsPerPage, currentPage, items }) => {
  const axiosSecure = useAxiosSecure();

  const numberOfPage = Math.ceil(count / itemsPerPage);

  const pages = [...Array(numberOfPage).keys()];

  const { data } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/${items}?page=${currentPage}&${itemsPerPage}`
      );
    },
  });
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
  return (
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
        Prev
      </button>
    </div>
  );
};

export default usePagination;
