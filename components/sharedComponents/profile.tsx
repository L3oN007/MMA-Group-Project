import React from "react";

import { Image, SafeAreaView, Text, View } from "react-native";

// Import useFocusEffect
import useAuthStore from "@/stores/useAuthStore";

import CustomButton from "@/components/global/custom-button";

export default function Profile() {
  const { onLogout, token, refreshToken, expired, user } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 justify-between bg-gray-100">
      <View className="p-4">
        {/* User Information */}
        <View className="flex-row gap-4">
          {user?.imageUrl ? (
            <Image
              source={{ uri: user.imageUrl }}
              className="mb-4 h-24 w-24 rounded-full border-2 border-blue-500"
            />
          ) : (
            <View className="mb-4 h-24 w-24 items-center justify-center rounded-full bg-gray-300">
              <Text className="text-xl text-gray-600">No Image</Text>
            </View>
          )}
          <View className="flex-col items-center justify-center">
            <Text className="text-2xl font-bold text-gray-800">
              {user?.fullName}
            </Text>
            <Text className="mb-6 text-sm text-gray-500">{user?.roleName}</Text>
          </View>
        </View>
        {/* Contact Information */}
        <View className="mb-4 w-full px-4">
          <Text className="text-lg font-semibold text-gray-800">
            Contact Information
          </Text>
          <Text className="mt-2 text-gray-700">
            Phone: {user?.phoneNumber || "N/A"}
          </Text>
          <Text className="mt-1 text-gray-700">
            Address: {user?.address || "N/A"}
          </Text>
        </View>
      </View>

      {/* Logout Button */}
      <View className="p-4">
        <CustomButton
          title="Logout"
          onPress={onLogout}
          className="rounded-md bg-red-500 py-3 text-lg font-semibold text-white"
        />
      </View>
    </SafeAreaView>
  );
}
