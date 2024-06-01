import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAlert from "../hooks/useAlert";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const alert = useAlert();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (!user) {
    if (location.pathname.includes("dashboard")) {
      alert("Join Warning", "warning");
    }
    return <Navigate to={"/join-us"} state={location?.pathname} />;
  }
  return children;
};

export default PrivateRoute;
