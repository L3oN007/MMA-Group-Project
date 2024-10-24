import React from "react";

import { SafeAreaView, Text, View } from "react-native";

import BlogsList from "@/components/blog/blogs-list";

export default function Blogs() {
  return (
    <SafeAreaView className="flex h-full bg-gray-50">
      <View className="p-4">
        <Text className="mb-4 text-2xl font-bold text-black">Blog Posts</Text>
        <BlogsList />
      </View>
    </SafeAreaView>
  );
}
