import { Outlet } from "react-router-dom";
import Navbar from "../../pages/shared/Navbar/Navbar";
import Footer from "../../pages/shared/Footer/Footer";

const Root = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
};

export default Root;
