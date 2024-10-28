import React from "react";
import { FlatList, SafeAreaView, ScrollView, Text } from "react-native";
import { useFish } from "@/hooks/useFish";
import { FishItem, FishItemSkeleton } from "@/components/fish/fish-item";

export default function FishList() {
  const { data: fishList, isLoading, isError } = useFish();

  if (isLoading) {
    return (
      <ScrollView className="mb-10 flex-col">
        {Array.from({ length: 4 }).map((_, index) => (
          <FishItemSkeleton key={index} />
        ))}
      </ScrollView>
    );
  }

  if (isError || !fishList || fishList.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-red-500">Error loading fish!</Text>
        {isError && <Text className="text-gray-500">{error?.message || "Unknown error"}</Text>}
      </SafeAreaView>
    );
  }

  return (
    <FlatList
      data={fishList}
      renderItem={({ item }) => <FishItem fish={item} />}
      keyExtractor={(item) => item.id.toString()} // Ensure id is a string
      contentContainerStyle={{ paddingBottom: 20 }}
      ListEmptyComponent={
        <SafeAreaView className="my-10 flex-1 items-center justify-center bg-gray-50">
          <Text className="text-gray-500">No fish to display.</Text>
        </SafeAreaView>
      }
    />
  );
}
