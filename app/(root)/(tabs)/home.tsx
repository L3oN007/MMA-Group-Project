import React from "react";

import { Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="flex h-full items-center justify-center bg-gray-50">
      <Text className="text-xl font-bold text-black">This is home page</Text>
    </SafeAreaView>
  );
}
