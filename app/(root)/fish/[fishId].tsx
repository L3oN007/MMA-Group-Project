import React from "react";
import { View, Text, Image, ScrollView, SafeAreaView } from "react-native";
import { useFishById } from "@/hooks/useFish";
import { RouteProp, useRoute } from "@react-navigation/native";
import { format } from "date-fns";

type FishDetailRouteParams = {
  FishDetail: {
    fishId: string;
  };
};

export default function FishDetail() {
  const route = useRoute<RouteProp<FishDetailRouteParams, "FishDetail">>();
  const { fishId } = route.params;
  
  const { data, isLoading, isError } = useFishById(fishId);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-gray-50">
        <Text>Loading fish details...</Text>
      </SafeAreaView>
    );
  }

  if (isError || !data) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-red-500">Error loading fish details!</Text>
      </SafeAreaView>
    );
  }

  const fish = data;

  return (
    <ScrollView className="flex-1 bg-white">
      <Image
        source={{ uri: fish.koiFishImages[0] || "default_image_url" }}
        className="h-56 w-full"
        resizeMode="cover"
      />
      <View className="p-4">
        <Text className="text-2xl font-semibold text-gray-800">{fish.name}</Text>
        <Text className="text-base text-gray-500">Origin: {fish.origin}</Text>

        <View className="mt-4 border-t border-gray-200 pt-4">
          <Text className="text-lg font-semibold text-gray-700">Details</Text>

          <View className="mt-2">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Gender:</Text>
              <Text className="text-gray-800">{fish.gender}</Text>
            </View>

            <View className="flex-row justify-between mt-2">
              <Text className="text-gray-600">Length:</Text>
              <Text className="text-gray-800">{fish.length} cm</Text>
            </View>

            <View className="flex-row justify-between mt-2">
              <Text className="text-gray-600">Weight:</Text>
              <Text className="text-gray-800">{fish.weight} g</Text>
            </View>

            <View className="flex-row justify-between mt-2">
              <Text className="text-gray-600">Daily Feed Amount:</Text>
              <Text className="text-gray-800">{fish.dailyFeedAmount} g</Text>
            </View>

            <View className="flex-row justify-between mt-2">
              <Text className="text-gray-600">Last Health Check:</Text>
              <Text className="text-gray-800">
                {format(new Date(fish.lastHealthCheck), "dd/MM/yyyy")}
              </Text>
            </View>
          </View>

           {/* Breed Information */}
           <View className="mt-4 border-t border-gray-200 pt-4">
            <Text className="text-lg font-semibold text-gray-700">Breeds</Text>
            {fish.koiBreeds.length > 0 ? (
              fish.koiBreeds.map((breed, index) => (
                <View key={index} className="mt-2">
                  <Text className="text-gray-800 font-medium">{breed.name}</Text>
                </View>
              ))
            ) : (
              <Text className="text-gray-600 text-sm">No breed information available.</Text>
            )}
          </View>

          <View className="mt-4 border-t border-gray-200 pt-4">
            <Text className="text-lg font-semibold text-gray-700">Personality Traits</Text>
            <Text className="text-gray-600 mt-2">{fish.personalityTraits}</Text>
          </View>

          <View className="mt-4 mb-8 border-t border-gray-200 pt-4">
            <Text className="text-lg font-semibold text-gray-700">Price</Text>
            <Text className="text-gray-600 mt-2">
              {fish.price ? `${fish.price.toFixed(0)} VND` : "Not for sale"}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
