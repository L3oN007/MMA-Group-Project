import { userService } from "@/services/users.service";
import useAuthStore from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";

const useUsers = () => {
  const { token, setUser } = useAuthStore();

  return useMutation({
    mutationFn: () => {
      if (!token) throw new Error("Invalid Token");
      return userService.getCurrentUser(token);
    },
    onSuccess: (userData) => {
      const data = userData.data;
      setUser(data);
    },
    onError: (error) => {
      console.error("Get user error: ", error.message);
    },
  });
};

export { useUsers };

