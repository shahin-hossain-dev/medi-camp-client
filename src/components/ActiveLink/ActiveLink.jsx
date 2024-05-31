import { NavLink } from "react-router-dom";
import "./ActiveLink.css";
const ActiveLink = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "nav-item text-white text-base font-medium"
          : " text-white text-base font-medium nav-non-select"
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
