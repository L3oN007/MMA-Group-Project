import React from "react";

import { SafeAreaView, Text } from "react-native";

import useAuthStore from "@/stores/useAuthStore";

import CustomButton from "@/components/global/custom-button";

export default function Profile() {
  const { onLogout } = useAuthStore();
  return (
    <SafeAreaView className="flex h-full items-center justify-center bg-gray-50">
      <Text className="text-xl font-bold text-black">This is profile page</Text>
      <CustomButton
        title="Logout"
        onPress={() => {
          onLogout();
        }}
      />
    </SafeAreaView>
  );
}

