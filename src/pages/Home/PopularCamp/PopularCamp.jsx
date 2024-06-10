import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import PopularCampCard from "./PopularCampCard";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";

const PopularCamp = () => {
  const axiosPublic = useAxiosPublic();

  const { data: camps, isLoading } = useQuery({
    queryKey: ["popularCamp"],
    queryFn: async () => {
      const res = await axiosPublic("/popular-camps?sort=dsc");
      //   console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className=" w-[90%] mx-auto">
      <SectionTitle />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-6 mt-12">
        {camps.map((camp) => (
          <PopularCampCard key={camp._id} camp={camp} />
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Link to={"/available-camps"}>
          <button className="btn text-[#ffffff] text-xl px-10 bg-gradient-to-br from-[#0066b2] to-[#003d6b] rounded-sm">
            See All Camps
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularCamp;
