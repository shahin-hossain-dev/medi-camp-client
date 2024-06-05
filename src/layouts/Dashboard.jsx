import { Link, Outlet } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";
import DashboardNav from "../components/DashboardNav/DashboardNav";
import { useState } from "react";

import useAuth from "../hooks/useAuth";
const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  return (
    <div>
      <h2 className="md:px-5 flex justify-between items-center py-2 lg:py-4 text-xl md:text-3xl font-medium text-white text-center bg-gradient-to-bl from-[#0066b2] to-[#003d6b]">
        <span></span>
        <span>Dashboard</span>
        <div className="flex gap-3 items-center px-5">
          <Link to={"/"}>
            <button className="text-sm btn btn-sm">View Site</button>
          </Link>
          <img src={user?.photoURL} className="w-[50px] rounded-full" alt="" />
        </div>
      </h2>
      <div className="grid md:grid-cols-10">
        {/* dashboard nav bar */}
        <div className="hidden md:flex md:col-span-3 lg:col-span-2">
          <DashboardNav />
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
          <DashboardNav />
        </div>
        <div className="md:col-span-7 lg:col-span-8 overflow-x-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
