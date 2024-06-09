import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const OrganizerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useUserRole();
  const location = useLocation();
  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  if (!user || role !== "organizer") {
    return <Navigate to={"/"} state={location?.pathname} />;
  }
  return children;
};

export default OrganizerRoute;
