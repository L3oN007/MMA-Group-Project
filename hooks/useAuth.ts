import authService from "@/services/auth.service";
import useAuthStore from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";

const useSignIn = () => {
  const { setToken, setExpired, setRefreshToken } = useAuthStore();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return authService.login(email, password);
    },
    onSuccess: (signInResponse) => {
      const { jwt, jwtRefreshToken, expired } = signInResponse.data;
      if (jwt && jwtRefreshToken && expired) {
        setToken(jwt);
        setRefreshToken(jwtRefreshToken);
        setExpired(new Date(expired));
      }
    },

    onError: (error) => {
      console.error("Login error:", error.message);
    },
  });
};

export { useSignIn };

