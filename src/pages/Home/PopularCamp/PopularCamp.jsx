import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const PopularCamp = () => {
  // http://localhost:5000/popular-camps?sort=dsc
  const axiosPublic = useAxiosPublic();

  const { data } = useQuery({
    queryKey: ["popularCamp"],
    queryFn: async () => {
      const res = await axiosPublic("/popular-camps?sort=dsc");
      //   console.log(res.data);
      return res.data;
    },
  });
  return <div></div>;
};

export default PopularCamp;
