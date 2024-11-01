import React from "react";

import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
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
  const { addToCart, isInCart } = useCart();

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

  const isFishInCart = isInCart(fish.id);

  return (
    <ScrollView className="flex-1 bg-white">
      <Image
        source={{
          uri: "https://storage.googleapis.com/pod_public/1300/135218.jpg",
        }}
        className="h-60 w-full"
        resizeMode="cover"
      />

      <View className="p-6">
        <Text className="text-3xl font-semibold text-gray-800">
          {fish.name}
        </Text>
        <Text className="mt-1 text-lg text-gray-500">
          Origin: {fish.origin}
        </Text>

        <View className="mt-6 border-t border-gray-200 pt-4">
          <Text className="mb-2 text-xl font-semibold text-gray-700">
            Details
          </Text>
          <View className="space-y-2">
            <DetailRow label="Gender" value={fish.gender} />
            <DetailRow label="Length" value={`${fish.length} cm`} />
            <DetailRow label="Weight" value={`${fish.weight} g`} />
            <DetailRow
              label="Daily Feed Amount"
              value={`${fish.dailyFeedAmount} g`}
            />
            <DetailRow
              label="Last Health Check"
              value={format(new Date(fish.lastHealthCheck), "dd/MM/yyyy")}
            />
          </View>
        </View>

        <InfoSection title="Breeds">
          {fish.koiBreeds.length > 0 ? (
            fish.koiBreeds.map((breed, index) => (
              <Text key={index} className="mt-1 font-medium text-gray-800">
                {breed.name}
              </Text>
            ))
          ) : (
            <Text className="text-gray-600">
              No breed information available.
            </Text>
          )}
        </InfoSection>

        <InfoSection title="Personality Traits">
          <Text className="text-gray-600">{fish.personalityTraits}</Text>
        </InfoSection>

        <InfoSection title="Price">
          <Text className="text-2xl font-bold text-green-600">
            {fish.price ? `${fish.price.toFixed(0)} VND` : "Not for sale"}
          </Text>
        </InfoSection>

        {/* Add to Cart Button */}
        <View className="mt-6">
          <TouchableOpacity
            onPress={handleAddToCart}
            disabled={isFishInCart}
            className={`rounded-lg p-4 ${
              isFishInCart ? "bg-gray-300" : "bg-blue-500"
            }`}
          >
            <Text className="text-center text-lg font-semibold text-white">
              {isFishInCart ? "Added to Cart" : "Add to Cart"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between border-b border-gray-100 py-2">
      <Text className="text-gray-600">{label}:</Text>
      <Text className="text-gray-800">{value}</Text>
    </View>
  );
}

function InfoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mt-6 border-t border-gray-200 pt-4">
      <Text className="mb-2 text-xl font-semibold text-gray-700">{title}</Text>
      {children}
    </View>
  );
}
