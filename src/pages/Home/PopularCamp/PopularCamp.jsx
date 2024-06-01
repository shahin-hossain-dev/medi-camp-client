import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import PopularCampCard from "./PopularCampCard";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const PopularCamp = () => {
  // http://localhost:5000/popular-camps?sort=dsc
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
    <div className=" w-[95%] mx-auto">
      <SectionTitle />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-6 mt-12">
        {camps.map((camp) => (
          <PopularCampCard key={camp._id} camp={camp} />
        ))}
      </div>
    </div>
  );
};

export default PopularCamp;
