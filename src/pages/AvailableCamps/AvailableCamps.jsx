import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import AvailableCampCard from "./AvailableCampCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useEffect, useState } from "react";
import moment from "moment";

const AvailableCamps = () => {
  //   enter page to view from top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [allCamps, setAllCamps] = useState();
  const axiosPublic = useAxiosPublic();

  const { data: camps, isLoading } = useQuery({
    queryKey: ["availableCamp"],
    queryFn: async () => {
      const res = await axiosPublic("/camps");
      setAllCamps(res.data);
      return res.data;
    },
  });
  // search camp with keywords
  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;

    const campSearch = camps.filter(
      (camp) =>
        camp.campName.toLowerCase().includes(searchText.toLowerCase()) ||
        moment(camp.dateAndTime).format("DD-MM-YYYY").includes(searchText) ||
        camp.healthcareProfessional
          .toLowerCase()
          .includes(searchText.toLowerCase())
    );
    setAllCamps(campSearch);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className=" w-[90%] mx-auto">
      <form onSubmit={handleSearch}>
        <fieldset className="form-control w-full">
          <label className="label flex justify-center md:justify-start mb-2 ">
            <span className="text-xl font-semibold">Search Camps Keyword</span>
          </label>
          <div className="join">
            <input
              type="text"
              name="search"
              placeholder="search your job"
              className=" outline-none px-3 w-full md:w-1/2 join-item rounded-md border border-[#0066b2]"
            />
            <button
              type="submit"
              className="btn  join-item border-[#0066b2] hover:border-[#0066b2]"
            >
              Search
            </button>
          </div>
        </fieldset>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-6 mt-12">
        {allCamps?.map((camp) => (
          <AvailableCampCard key={camp._id} camp={camp} />
        ))}
      </div>
    </div>
  );
};

export default AvailableCamps;
