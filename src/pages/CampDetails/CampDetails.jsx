import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt, FaUsers } from "react-icons/fa";
import moment from "moment";
import { LuBadgeDollarSign } from "react-icons/lu";
import { FaUserDoctor } from "react-icons/fa6";
import { SiTicktick } from "react-icons/si";
import ParticipantRegiModal from "../../components/Modals/ParticipantRegiModal";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const CampDetails = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  // enter page to view from top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    data: camp,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["singleCamp"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/camps/${id}`);
      // console.log(res.data.data);
      return res.data;
    },
  });
  // console.log(camp);
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
    <div className="w-[90%] mx-auto mt-12 ">
      <div className="flex justify-between border-b border-b-[#003d6b99]  pb-4  mb-6">
        <div className="flex gap-6  items-center ">
          <span className="flex gap-2 text-base items-center text-gray-500">
            <IoLocationOutline className=" text-gray-500" />
            <span className="  ">{location}</span>
          </span>{" "}
          |
          <span className="flex gap-2 text-base items-center  text-gray-500 ">
            <FaRegCalendarAlt />
            {date}
          </span>
        </div>
        <div title={user ? "Join a Camp" : "Please Join Us"}>
          <button
            onClick={() =>
              document.getElementById("participant-register-modal").showModal()
            }
            className={`btn text-[#ffffff]  rounded-sm ${
              user ? "bg-gradient-to-br from-[#0066b2] to-[#003d6b]" : ""
            }`}
            disabled={!user}
          >
            Join Camp
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center-start">
        <div className="w-full ">
          <figure>
            <img
              src={image}
              alt="Camp Img"
              className="h-[200px] md:h-[500px] w-full object-cover rounded-sm"
            />
          </figure>
        </div>

        <div>
          <h2 className="card-title text-[#003d6b] text-2xl md:text-4xl mb-2">
            {campName}
          </h2>
          <div className="flex  gap-2 text-[#efb312] font-medium text-2xl items-center mb-6">
            <LuBadgeDollarSign className="" />
            <p className="    ">
              {fees} /{" "}
              <span className="text-gray-400 font-normal text-xl">
                camp fee
              </span>
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between border-b py-1">
              <p className="font-medium">Participants</p>
              <span className="flex gap-2 text-gray-500 items-center ">
                <FaUsers />
                {participantCount}
              </span>
            </div>
            <div className="flex justify-between border-b py-1">
              <p className="font-medium">Date and Time</p>
              <span className="flex gap-2 items-center text-base text-gray-500">
                <FaRegCalendarAlt />
                {date}
              </span>
            </div>
            <div className="flex justify-between border-b py-1">
              <p className="font-medium">Healthcare Professional</p>
              <span className="flex gap-2 items-center text-base text-gray-500">
                <FaUserDoctor />
                {healthcareProfessional}
              </span>
            </div>
            <div className="flex justify-between border-b py-1">
              <p className="font-medium">Location</p>
              <span className="flex gap-2 text-base items-center text-gray-500">
                <IoLocationOutline className=" text-gray-500" />
                <span className="  ">{location}</span>
              </span>{" "}
            </div>
          </div>
          <div className="my-6">
            <p className="font-medium mb-3">Medical Services</p>
            {medicalServices?.map((service, idx) => (
              <p key={idx} className="flex items-center gap-3 space-y-2">
                <SiTicktick className="text-[#efb312]" />
                <span className="text-gray-500">{service}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="my-6">
        <p className="text-2xl font-semibold mb-3 pb-3 border-b border-b-[#003d6b99]">
          Description
        </p>
        <p>{description}</p>
      </div>
      <ParticipantRegiModal camp={camp} refetch={refetch} />
    </div>
  );
};

export default CampDetails;
