import React from "react";

import { SafeAreaView } from "react-native";
import CustomerProfile from "@/components/sharedComponents/customerProfile";


export default function Profile_() {
  return (
    <SafeAreaView className="flex h-full bg-gray-50">
      <CustomerProfile />
    </SafeAreaView>
  );
}

