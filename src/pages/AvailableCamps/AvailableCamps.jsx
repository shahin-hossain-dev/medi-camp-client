import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
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
      {/* Search input */}
      <div className="flex gap-5">
        <form onSubmit={handleSearch} className="flex-1">
          <fieldset className="form-control w-full">
            <label className="label flex justify-center md:justify-start mb-1 ">
              <span className="text-xl font-medium">Search Camps Keyword</span>
            </label>
            <div className="join">
              <input
                type="text"
                name="search"
                placeholder="search your job"
                className=" outline-none px-3 w-full join-item rounded-sm border border-[#0066b2]"
              />
              <button
                type="submit"
                className="btn rounded-sm join-item border-[#0066b2] hover:border-[#0066b2]"
              >
                Search
              </button>
            </div>
          </fieldset>
        </form>
        {/* Sort dropdown */}
        <div className=" flex-1 ">
          <label className="label flex justify-center md:justify-start mb-1 ">
            <span className="text-xl font-medium">Sort Option</span>
          </label>
          <select className="select focus:border-[#0066b2] focus:outline-0 focus:outline-offset-0 rounded-sm w-full border-[#0066b2]">
            <option defaultValue={"selected"} value={"Filter Job"}>
              Sort Camps
            </option>
            <option value={"On Site"}>Most Registered</option>
            <option value={"Remote"}>Camp Fees</option>
            <option value={"Hybrid"}>A-Z Order</option>
          </select>
        </div>
      </div>

      {/* camps card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-6 mt-12">
        {allCamps?.map((camp) => (
          <AvailableCampCard key={camp._id} camp={camp} />
        ))}
      </div>
    </div>
  );
};

export default AvailableCamps;
