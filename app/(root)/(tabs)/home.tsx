import React from "react";

import { Text } from "react-native";

import useAuthStore from "@/stores/useAuthStore";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/global/custom-button";

export default function Home() {
  const { onLogout } = useAuthStore();
  return (
    <SafeAreaView className="flex h-full items-center justify-center bg-gray-50">
      <Text className="text-xl font-bold text-black">This is home page</Text>
      <CustomButton
        title="Logout"
        onPress={() => {
          onLogout();
        }}
      />
    </SafeAreaView>
  );
}
