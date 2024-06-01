import { IoLocationOutline } from "react-icons/io5";
import { LuBadgeDollarSign } from "react-icons/lu";
import { TbCurrencyTaka } from "react-icons/tb";
const styles = {
  clipPath: "polygon(0% 0%, 100% 0, 99% 100%, 77% 93%, 0% 100%)",
};

const PopularCampCard = ({ camp }) => {
  const {
    campName,
    participantCount,
    dateAndTime,
    medicalServices,
    location,
    image,
    fees,
  } = camp;
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
        <h2 className="card-title text-[#003d6b]">{campName}</h2>
        <span className="flex gap-1 items-center">
          <IoLocationOutline className="text-base text-[#0066b2]" />
          <span className="text-base  text-[#0066b2]">{location}</span>
        </span>
        <div className="flex gap-1 items-center">
          <LuBadgeDollarSign className="text-base text-[#0066b2]" />
          <p className="text-base  text-[#0066b2]">{fees}</p>
        </div>

        <span>{participantCount}</span>
        <span>{dateAndTime}</span>

        <div className="card-actions justify-end mt-auto">
          <button className="btn text-[#ffffff] bg-gradient-to-br from-[#0066b2] to-[#003d6b] rounded-sm">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularCampCard;
