import { userService } from "@/services/users.service";
import useAuthStore from "@/stores/useAuthStore";
import { IUser } from "@/types/user.type";
import { useMutation } from "@tanstack/react-query";

const useUsers = () => {
  const { token, setUser } = useAuthStore();

  return useMutation({
    mutationFn: () => {
      if (!token) throw new Error("Invalid Token");
      return userService.getCurrentUser(token);
    },
    onSuccess: (userData): IUser => {
      const data = userData.data;
      setUser(data);
      return data;
    },
    onError: (error) => {
      console.error("Get user error: ", error.message);
    },
  });
};

export { useUsers };

