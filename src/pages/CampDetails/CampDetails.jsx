import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt, FaUsers } from "react-icons/fa";
import moment from "moment";
import { LuBadgeDollarSign } from "react-icons/lu";
import { FaUserDoctor } from "react-icons/fa6";

const CampDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  console.log(id);
  const { data: camp, isLoading } = useQuery({
    queryKey: ["singleCamp"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/camps/${id}`);
      console.log(res.data.data);
      return res.data;
    },
  });
  console.log(camp);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const {
    campName,
    participantCount,
    dateAndTime,
    medicalServices,
    healthcareProfessional,
    location,
    image,
    fees,
    description,
  } = camp;
  const date = moment(dateAndTime).format("DD/MM/YYYY, hh:mm a");
  return (
    <div>
      <h2 className="card-title text-[#003d6b] text-5xl mt-12 mb-6">
        {campName}
      </h2>
      <div className="flex gap-6 items-center  mb-6">
        <span className="flex gap-1 text-xl items-center text-gray-500">
          <IoLocationOutline className=" text-gray-500" />
          <span className="  ">{location}</span>
        </span>{" "}
        |
        <span className="flex gap-1 text-xl items-center  text-gray-500 ">
          <FaRegCalendarAlt />
          {date}
        </span>
      </div>
      <div>
        <figure>
          <img
            src={image}
            alt="Camp Img"
            className="h-[200px] md:h-[500px] w-full object-cover"
          />
        </figure>
      </div>
      <div>
        <div className="flex gap-1 items-center">
          <LuBadgeDollarSign className="text-base text-[#0066b2]" />
          <p className="text-base  text-[#0066b2]">{fees}</p>
        </div>
        <span className="flex gap-1 items-center text-[#0066b2]">
          <FaUsers />
          {participantCount}
        </span>
        <span className="flex gap-1 items-center text-base text-[#0066b2] ">
          <FaRegCalendarAlt />
          {date}
        </span>
        <span className="flex gap-1 items-center text-base text-[#0066b2] ">
          <FaUserDoctor />
          {healthcareProfessional}
        </span>
        <p>{description}</p>
      </div>
      <button className="btn text-[#ffffff] bg-gradient-to-br from-[#0066b2] to-[#003d6b] rounded-sm">
        Join Camp
      </button>
    </div>
  );
};

export default CampDetails;
