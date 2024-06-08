import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAlert from "../hooks/useAlert";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const alert = useAlert();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
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
