import React from "react";

import useAuthStore from "@/stores/useAuthStore";
import Profile from "@/components/sharedComponents/profile";
import { SafeAreaView } from "react-native";


export default function Profile_() {
  return (
    <SafeAreaView className="flex h-full bg-gray-50">
      <Profile />
    </SafeAreaView>
  );
}

