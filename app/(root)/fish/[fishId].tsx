import React from "react";

import {
  Button,
  // Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

import { RouteProp, useRoute } from "@react-navigation/native";
import { format } from "date-fns";

import { useCart } from "@/hooks/useCart";
import { useFishById } from "@/hooks/useFish";

type FishDetailRouteParams = {
  FishDetail: {
    fishId: string;
  };
};

export default function FishDetail() {
  const route = useRoute<RouteProp<FishDetailRouteParams, "FishDetail">>();
  const { fishId } = route.params;

  const { data: fish, isLoading, isError } = useFishById(fishId);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (fish) {
      await addToCart(fish);
      alert("Fish added to cart!");
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-gray-50">
        <Text>Loading fish details...</Text>
      </SafeAreaView>
    );
  }

  if (isError || !fish) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-red-500">Error loading fish details!</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Fish Image */}
      {/* <Image
        source={{ uri: fish.koiFishImages[0] || "default_image_url" }}
        className="h-56 w-full"
        resizeMode="cover"
      /> */}
      <View className="p-4">
        {/* Fish Name and Origin */}
        <Text className="text-2xl font-semibold text-gray-800">
          {fish.name}
        </Text>
        <Text className="text-base text-gray-500">Origin: {fish.origin}</Text>

        {/* Fish Details */}
        <View className="mt-4 border-t border-gray-200 pt-4">
          <Text className="text-lg font-semibold text-gray-700">Details</Text>
          <View className="mt-2">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Gender:</Text>
              <Text className="text-gray-800">{fish.gender}</Text>
            </View>
            <View className="mt-2 flex-row justify-between">
              <Text className="text-gray-600">Length:</Text>
              <Text className="text-gray-800">{fish.length} cm</Text>
            </View>
            <View className="mt-2 flex-row justify-between">
              <Text className="text-gray-600">Weight:</Text>
              <Text className="text-gray-800">{fish.weight} g</Text>
            </View>
            <View className="mt-2 flex-row justify-between">
              <Text className="text-gray-600">Daily Feed Amount:</Text>
              <Text className="text-gray-800">{fish.dailyFeedAmount} g</Text>
            </View>
            <View className="mt-2 flex-row justify-between">
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
                  <Text className="font-medium text-gray-800">
                    {breed.name}
                  </Text>
                </View>
              ))
            ) : (
              <Text className="text-sm text-gray-600">
                No breed information available.
              </Text>
            )}
          </View>

          {/* Personality Traits */}
          <View className="mt-4 border-t border-gray-200 pt-4">
            <Text className="text-lg font-semibold text-gray-700">
              Personality Traits
            </Text>
            <Text className="mt-2 text-gray-600">{fish.personalityTraits}</Text>
          </View>

          {/* Price */}
          <View className="mb-8 mt-4 border-t border-gray-200 pt-4">
            <Text className="text-lg font-semibold text-gray-700">Price</Text>
            <Text className="mt-2 text-gray-600">
              {fish.price ? `${fish.price.toFixed(0)} VND` : "Not for sale"}
            </Text>
          </View>
        </View>

        {/* Add to Cart Button */}
        <View className="mt-6">
          <Button title="Add to Cart" onPress={handleAddToCart} />
        </View>
      </View>
    </ScrollView>
  );
}
