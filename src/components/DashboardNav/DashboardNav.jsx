import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { LuFolderEdit } from "react-icons/lu";
import DashboardLink from "../DashboardLink/DashboardLink";

const DashboardNav = () => {
  return (
    <div className="bg-[#1F2937] pt-20 p-5 md:p-5 min-h-screen ">
      <div className="flex gap-2 items-center">
        <LuLayoutDashboard className="text-white text-lg" />
        <h2 className="text-base md:text-xl text-[#D1D5DB]">Dashboard</h2>
      </div>
      <ul className=" space-y-4 mt-8 ">
        <li>
          <DashboardLink to={"organizer-profile"}>
            <FaRegUserCircle className=" text-lg" />
            <span>Organizer Profile</span>
          </DashboardLink>
        </li>
        <li>
          <DashboardLink to={"add-camp"}>
            <MdOutlineAddCircleOutline className="text-xl" />
            <span>Add A Camp</span>
          </DashboardLink>
        </li>
        <li>
          <DashboardLink to={"manage-camp"}>
            <FaEdit className=" text-lg" />
            <span>Manage Camps</span>
          </DashboardLink>
        </li>
        <li>
          <DashboardLink to={"registered-camp"}>
            <LuFolderEdit className=" text-lg" />
            <span>Manage Registered Camps</span>
          </DashboardLink>
        </li>
      </ul>
    </div>
  );
};

export default DashboardNav;
