import { IoLocationOutline } from "react-icons/io5";
import { LuBadgeDollarSign } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import moment from "moment";
import { Link } from "react-router-dom";
const styles = {
  clipPath: "polygon(0% 0%, 100% 0, 99% 100%, 77% 93%, 0% 100%)",
};

const PopularCampCard = ({ camp }) => {
  const {
    _id,
    campName,
    participantCount,
    dateAndTime,
    // medicalServices,
    healthcareProfessional,
    location,
    image,
    fees,
  } = camp;

  const date = moment(dateAndTime).format("DD/MM/YYYY, hh:mm a");
  return (
    <div className="card card-compact rounded-none shadow-xl">
      <figure>
        <img
          style={styles}
          src={image}
          alt="Camp Img"
          className="h-[200px] object-cover w-full"
        />
      </figure>
      <div className="card-body">
        <span className="flex gap-1 items-center">
          <IoLocationOutline className="text-base text-[#0066b2]" />
          <span className="text-base  text-[#0066b2]">{location}</span>
        </span>
        <h2 className="card-title text-[#003d6b]">{campName}</h2>

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

        <div className="card-actions justify-end mt-auto">
          <Link to={`/camp-details/${_id}`}>
            <button className="btn text-[#ffffff] bg-gradient-to-br from-[#0066b2] to-[#003d6b] rounded-sm">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularCampCard;
