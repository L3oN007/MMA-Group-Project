import React from "react";

import { SafeAreaView, Text, View } from "react-native";

import useAuthStore from "@/stores/useAuthStore";

import CustomButton from "@/components/global/custom-button";

export default function Profile() {
  const { onLogout, token, refreshToken, expired, user } = useAuthStore();

  return (
    <SafeAreaView className="flex h-full items-center justify-center bg-gray-50">
      <Text className="mb-4 text-xl font-bold text-black">
        This is profile page
      </Text>

      <View className="w-11/12 rounded-lg bg-white p-4 shadow-md">
        <Text className="text-base text-gray-700">
          <Text className="font-semibold">Token: </Text>
          {token ? token : "No token available"}
        </Text>

        <Text className="mt-2 text-base text-gray-700">
          <Text className="font-semibold">Refresh Token: </Text>
          {refreshToken ? refreshToken : "No refresh token available"}
        </Text>

        <Text className="mt-2 text-base text-gray-700">
          <Text className="font-semibold">Expired: </Text>
          {expired ? expired.toString() : "No expiration date available"}
        </Text>

        <Text className="mt-2 text-base text-gray-700">
          <Text className="font-semibold">Role: </Text>
          {user?.roleName}
        </Text>
      </View>

      <CustomButton
        title="Logout"
        onPress={() => {
          onLogout();
        }}
        className="mt-6"
      />
    </SafeAreaView>
  );
}

