import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userRole, isLoading } = useQuery({
    queryKey: ["userRole", user?.email, axiosSecure],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/role/${user.email}`);
      return res.data?.role;
    },
  });
  return [userRole, isLoading];
};

export default useUserRole;
