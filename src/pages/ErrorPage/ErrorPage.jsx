import { Link } from "react-router-dom";
import error from "../../assets/error/404.gif";
import { IoHomeSharp } from "react-icons/io5";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <div className="text-center mb-5 text-neutral">
          <div className="flex justify-center">
            <img src={error} className="w-2/3 rounded-md" alt="" />
          </div>
          <h3 className="text-3xl font-semibold mb-2 mt-3">Page Not Found</h3>
          <p className="text-lg ">
            We are sorry, the page you have looked for does not exist in our
            database! <br /> Maybe be go to our home page
          </p>
        </div>
        <Link to={"/"}>
          <button className="btn text-[#ffffff] text-xl px-10 bg-gradient-to-br from-[#0066b2] to-[#003d6b] rounded-sm">
            <span className="relative flex items-center gap-2 text-base font-semibold">
              <IoHomeSharp />
              <span>Go Back to Home</span>
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
