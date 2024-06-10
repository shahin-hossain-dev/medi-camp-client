import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "https://b9a12-server-side-shahin-hossain-dev.vercel.app",
});
const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const { navigate } = useNavigate();

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("camp-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response
  axiosSecure.interceptors.response.use(
    function (response) {
      // console.log(response);
      return response;
    },
    async (error) => {
      const status = error.response.status;
      // for 401 and 403 status logout and navigate the user to login page
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      console.log("status error", error.response.status);
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
