import { Link, useNavigate } from "react-router-dom";
import ActiveLink from "../../../components/ActiveLink/ActiveLink";
import "./Navbar.css";
import useAuth from "../../../hooks/useAuth";
import { FaRegUser } from "react-icons/fa6";
import { TbCategory } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import logo from "../../../assets/logo.png";
import useAlert from "../../../hooks/useAlert";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const alert = useAlert();
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut().then(() => {
      alert("Logout Successfully", "success");
      navigate("/");
    });
  };
  const navLinks = (
    <>
      <li>
        <ActiveLink to={"/"}>Home</ActiveLink>
      </li>
      <li>
        <ActiveLink to={"/available-camps"}>Available Camps</ActiveLink>
      </li>
    </>
  );
  return (
    <div className="navbar md:px-5 py-5 bg-gradient-to-br from-[#0066b2] to-[#003d6b]">
      <div className="navbar-start">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              color="white"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content  mt-3 z-[1] p-2 shadow bg-base-100 rounded-md w-52"
          >
            {navLinks}
          </ul>
        </div>
        {/* <h2 className=" text-xl text-[#ffffff] md:text-3xl font-bold">
          MediCamp
        </h2> */}
        <img src={logo} className="lg:w-[200px]" alt="" />
      </div>
      <div className="navbar-center justify-center hidden lg:flex">
        <ul className="flex gap-5 text-[#ffffff]">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {!user && (
          <Link to={"/join-us"}>
            <button className=" text-[#000000] rounded-sm px-5 duration-150 active:scale-95  font-medium me-3 bg-[#efb312] p-3 py-2">
              Join Us
            </button>
          </Link>
        )}

        {/* user */}
        {user && (
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
                <h3 className="justify-between">
                  <span className="flex gap-2">
                    <FaRegUser />
                    <span>{user?.displayName}</span>
                  </span>
                  {/* <span className="badge">New</span> */}
                </h3>
              </li>
              <li>
                <span>
                  <TbCategory />
                  <Link to={"/dashboard"}>Dashboard</Link>
                </span>
              </li>
              <li>
                <span className="flex gap-2">
                  <MdLogout />
                  <button onClick={handleLogout}>Logout</button>
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
