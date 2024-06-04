import { NavLink } from "react-router-dom";

const DashboardLink = ({ to, children }) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <span
          className={` flex p-2 rounded-lg gap-2 items-center  ${
            isActive
              ? "text-[white] text-base bg-[#012f53] "
              : "hover:bg-[#012f53] duration-200  text-[#D1D5DB]"
          }`}
        >
          {children}
        </span>
      )}
    </NavLink>
  );
};

export default DashboardLink;
