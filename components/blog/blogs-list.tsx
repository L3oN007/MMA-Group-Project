import React from "react";

import { FlatList, SafeAreaView, ScrollView, Text } from "react-native";

import { useBlogs } from "@/hooks/useBlog";

import { BlogItem, BlogItemSkeleton } from "@/components/blog/blog-item";

export default function BlogsList() {
  const { data: blogs, isLoading, isError } = useBlogs();

  if (isLoading) {
    return (
      <ScrollView className="mb-10 flex-col">
        {Array.from({ length: 4 }).map((_, index) => (
          <BlogItemSkeleton key={index} />
        ))}
      </ScrollView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-red-500">Error loading blogs!</Text>
      </SafeAreaView>
    );
  }

  return (
    <FlatList
      data={blogs}
      renderItem={({ item }) => <BlogItem blog={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}

