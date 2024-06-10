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
import UpdateCamp from "../pages/Dashboard/UpdateCamp/UpdateCamp";
import Analytics from "../pages/Dashboard/Analytics/Analytics";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import RegisteredCamps from "../pages/Dashboard/RegisteredCamps/RegisteredCamps";
import ParticipantProfile from "../pages/Dashboard/ParticipantProfile/ParticipantProfile";
import Payment from "../pages/Dashboard/Payment/Payment";
import OrganizerRoute from "./OrganizerRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
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
        element: (
          <OrganizerRoute>
            <AddCamp />
          </OrganizerRoute>
        ),
      },
      {
        path: "manage-camp",
        element: <ManageCamp />,
      },
      {
        path: "registered-camp",
        element: <ManageRegisteredCamp />,
      },
      {
        path: "update-camp/:id",
        element: <UpdateCamp />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "participant-registered-camps",
        element: <RegisteredCamps />,
      },
      {
        path: "participant-profile",
        element: <ParticipantProfile />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
    ],
  },
]);

export default router;
