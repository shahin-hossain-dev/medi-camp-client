import { NavLink } from "react-router-dom";
import "./ActiveLink.css";
const ActiveLink = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "nav-item text-neutral lg:text-white text-base font-medium"
          : "text-neutral lg:text-white text-base font-medium nav-non-select"
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
