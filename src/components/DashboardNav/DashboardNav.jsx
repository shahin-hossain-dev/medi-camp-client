import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { LuFolderEdit } from "react-icons/lu";
import DashboardLink from "../DashboardLink/DashboardLink";
import { IoAnalyticsSharp } from "react-icons/io5";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";

const DashboardNav = ({ role, isLoading }) => {
  if (isLoading) {
    return;
  }
  return (
    <div className="bg-[#003d6b] pt-20 p-5 md:p-5 min-h-screen ">
      <div className="flex gap-2 items-center">
        <LuLayoutDashboard className="text-white text-lg" />
        <h2 className="text-base md:text-xl text-[#D1D5DB]">Dashboard</h2>
      </div>
      <ul className=" space-y-4 mt-8 ">
        {role === "organizer" && (
          <>
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
          </>
        )}
        {role === "participant" && (
          <>
            <li>
              <DashboardLink to={"analytics"}>
                <IoAnalyticsSharp className=" text-lg" />
                <span>Analytics</span>
              </DashboardLink>
            </li>
            <li>
              <DashboardLink to={"participant-profile"}>
                <FaRegUserCircle className=" text-lg" />
                <span>Participant Profile</span>
              </DashboardLink>
            </li>
            <li>
              <DashboardLink to={"participant-registered-camps"}>
                <MdOutlineBookmarkAdded className=" text-xl" />
                <span>Registered Camps</span>
              </DashboardLink>
            </li>
            <li>
              <DashboardLink to={"payment-history"}>
                <MdOutlinePayment className=" text-xl" />
                <span>Payment History</span>
              </DashboardLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default DashboardNav;
