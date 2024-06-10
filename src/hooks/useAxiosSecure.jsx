import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://b9a12-server-side-shahin-hossain-dev.vercel.app",
});
const useAxiosSecure = () => {
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
  return axiosSecure;
};

export default useAxiosSecure;
