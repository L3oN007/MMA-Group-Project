import authService from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

const useAuth = () => {
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (variables: { email: string; password: string }) => {
      const { email, password } = variables;
      const res = await authService.login(email, password);
      return res;
    },
  });

  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: async (variables: {
      email: string;
      password: string;
      fullName: string;
      dob: string;
      phoneNumber: string;
      imageUrl: string;
      address: string;
    }) => {
      const { email, password, fullName, dob, phoneNumber, imageUrl, address } =
        variables;
      const res = await authService.register(
        email,
        password,
        fullName,
        dob,
        phoneNumber,
        imageUrl,
        address
      );
      return res;
    },
  });

  return {
    login: loginMutation,
    register: registerMutation,
  };
};

export default useAuth;

