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
  const [allCamps, setAllCamps] = useState([]);
  const [layout, setLayout] = useState(false);

  const axiosPublic = useAxiosPublic();

  const {
    data: camps,
    // refetch,
    isLoading,
  } = useQuery({
    queryKey: ["availableCamp"],
    queryFn: async () => {
      const res = await axiosPublic(`/camps`);
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

  // card Layout

  const layoutHandle = () => {
    setLayout(!layout);
  };

  // sort options
  const handleSort = async (e) => {
    console.log(e.target.value);
    const text = e.target.value;

    const res = await axiosPublic(`/campsAll?sort=${text}`);

    setAllCamps(res.data);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className=" w-[90%] mx-auto">
      {/* Search input */}
      <div className="flex flex-col lg:flex-row gap-5">
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
        {/* layout changer  */}
        <div className="mt-auto hidden lg:block">
          <button
            onClick={layoutHandle}
            className="btn text-[#ffffff] bg-gradient-to-br from-[#0066b2] to-[#003d6b] rounded-sm"
          >
            Change Layout
          </button>
        </div>
        {/* Sort dropdown */}
        <div className=" flex-1 ">
          <label className="label flex justify-center md:justify-start mb-1 ">
            <span className="text-xl font-medium">Sort Option</span>
          </label>
          <select
            onChange={handleSort}
            defaultValue={"Sort Camps"}
            className="select focus:border-[#0066b2] focus:outline-0 focus:outline-offset-0 rounded-sm w-full border-[#0066b2]"
          >
            <option disabled>Sort Camps</option>
            <option value={"Most Registered"}>Most Registered</option>
            <option value={"Camp Fees"}>Camp Fees</option>
            <option value={"A-Z Order"}>A-Z Order</option>
          </select>
        </div>
      </div>

      {/* camps card */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:${
          layout ? "grid-cols-2" : "grid-cols-3"
        } gap-6 gap-y-6 mt-12`}
      >
        {allCamps.map((camp) => (
          <AvailableCampCard key={camp._id} camp={camp} />
        ))}
      </div>
    </div>
  );
};

export default AvailableCamps;
