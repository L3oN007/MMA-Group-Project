import React from "react";

import { Pressable, SafeAreaView, Text } from "react-native";

import { router } from "expo-router";

export default function SignUp() {
  return (
    <SafeAreaView>
      <Text>SignUp</Text>
      <Pressable onPress={() => router.replace("/(auth)/welcome")}>
        <Text>Go to welcome page</Text>
      </Pressable>
    </SafeAreaView>
  );
}

