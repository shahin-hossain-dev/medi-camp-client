import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root/Root";
import Home from "../pages/Home/Home/Home";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import JoinUs from "../pages/JoinUs/JoinUs";
import Register from "../pages/Register/Register";
import Dashboard from "../layouts/Dashboard";
import OrganizerProfile from "../pages/Dashboard/OrganizerProfile/OrganizerProfile";
import PrivateRoute from "./PrivateRoute";
import CampDetails from "../pages/CampDetails/CampDetails";
import AddCamp from "../pages/Dashboard/AddCamp/AddCamp";
import ManageCamp from "../pages/Dashboard/ManageCamp/ManageCamp";
import ManageRegisteredCamp from "../pages/Dashboard/ManageRegisteredCamp/ManageRegisteredCamp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/available-camps",
        element: <AvailableCamps />,
      },
      {
        path: "/join-us",
        element: <JoinUs />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/camp-details/:id",
        element: <CampDetails />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "organizer-profile",
        element: <OrganizerProfile />,
      },
      {
        path: "add-camp",
        element: <AddCamp />,
      },
      {
        path: "manage-camp",
        element: <ManageCamp />,
      },
      {
        path: "registered-camp",
        element: <ManageRegisteredCamp />,
      },
    ],
  },
]);

export default router;
