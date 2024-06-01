import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h2>User dashboard</h2>
      <Outlet />
    </div>
  );
};

export default Dashboard;
