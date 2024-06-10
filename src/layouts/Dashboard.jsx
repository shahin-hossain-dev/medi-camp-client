import { Link, Outlet, useNavigate } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";
import DashboardNav from "../components/DashboardNav/DashboardNav";
import { useState } from "react";
import logo from "../assets/logo.png";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import { FaRegUser, FaHome } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

import useAlert from "../hooks/useAlert";
const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useAuth();
  const alert = useAlert();
  const navigate = useNavigate();
  const [role, isLoading] = useUserRole();

  const handleLogout = () => {
    logOut().then(() => {
      alert("Logout Successfully", "success");
      navigate("/");
    });
  };

  return (
    <div>
      <h2 className="md:px-5 flex justify-between items-center py-2 lg:py-3 font-medium text-white text-center bg-gradient-to-bl from-[#0066b2] to-[#003d6b]">
        <span>
          <img src={logo} className="w-[150px] lg-[200px]" alt="" />
        </span>

        <div className="flex gap-3 items-center px-5">
          <div>
            <Link to={"/"}>
              <button className="text-sm btn btn-sm font-medium border-0 text-[#D1D5DB] rounded-sm bg-gradient-to-br from-[#0066b2] to-[#003d6b] hover:bg-gradient-to-bl  ">
                <FaHome />
                View Home
              </button>
            </Link>
          </div>

          {/* drop down  */}
          <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar  text-[#ffffff"
            >
              <div className="w-10 rounded-full">
                <img alt="User Image" src={user?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu rounded-md menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100  w-52 "
            >
              <li>
                <h3 className="justify-between text-neutral">
                  <span className="flex gap-2">
                    <FaRegUser />
                    <span>{user?.displayName}</span>
                  </span>
                  {/* <span className="badge">New</span> */}
                </h3>
              </li>
              <li>
                <span className="flex gap-2 text-neutral ">
                  <MdLogout />
                  <button onClick={handleLogout}>Logout</button>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </h2>
      <div className="grid md:grid-cols-10">
        {/* dashboard nav bar */}
        <div className="hidden  top-0  md:flex md:col-span-3 lg:col-span-2">
          <DashboardNav role={role} isLoading={isLoading} />
        </div>
        <button
          className={`absolute md:hidden p-5 z-30 ${
            open
              ? "text-white rotate-180 duration-300"
              : "text-[#1F2937] duration-300"
          }`}
          onClick={() => setOpen(!open)}
        >
          <HiMenuAlt1 className="text-3xl" />
        </button>
        <div
          className={`md:hidden absolute z-[10]  ${
            open
              ? "translate-x-0 duration-300"
              : "-translate-x-[100%] duration-300"
          } `}
        >
          <DashboardNav role={role} isLoading={isLoading} />
        </div>
        <div className="md:col-span-7 lg:col-span-8 overflow-x-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
