// hooks/useDeposit.ts
import { Alert, Linking } from "react-native";

import { userService } from "@/services/users.service";
import useAuthStore from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";

const useDeposit = () => {
  const { token } = useAuthStore();

  return useMutation({
    mutationFn: (amount: number) => {
      if (!token) throw new Error("Invalid Token");
      return userService.deposit(token, amount);
    },
    onSuccess: (response) => {
      const { payUrl, message } = response.data;
      if (payUrl) {
        Alert.alert("Redirecting to payment...", message);
        Linking.openURL(payUrl);
      } else {
        Alert.alert("Error", "Payment URL not provided.");
      }
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      console.error("Deposit error:", errorMessage);
      Alert.alert("Error", errorMessage);
    },
  });
};

export { useDeposit };
