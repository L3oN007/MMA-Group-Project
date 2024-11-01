import React, { useCallback } from "react";

import {
  Button,
  // Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { router, useFocusEffect } from "expo-router";

import { IFish } from "@/types/fish.type";

import { useCart } from "@/hooks/useCart";

import Skeleton from "@/components/global/skeleton";

type Props = {
  fish: IFish;
  onSelect: (fish: IFish) => void;
};

function FishItem({ fish, onSelect }: Props) {
  const { addToCart, removeFromCart, isInCart, loadCart } = useCart();
  const handleCartToggle = () => {
    if (isInCart(fish.id)) {
      removeFromCart(fish.id);
    } else {
      addToCart(fish);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCart(); // This loads the cart from AsyncStorage
    }, [])
  );

  return (
    <Pressable
      className="mb-4 rounded-xl border border-gray-200 bg-white shadow"
      onPress={() => router.navigate(`/(root)/fish/${fish.id}`)}
    >
      {/* <Image
        source={{ uri: fish?.koiFishImages[0] || "https://storage.googleapis.com/pod_public/1300/135218.jpg" }}
        className="h-40 w-full rounded-t-xl"
        resizeMode="center"
      /> */}
      <View className="p-4">
        <View className="flex-row justify-between">
          <Text className="text-lg font-semibold text-black">{fish.name}</Text>
          <TouchableOpacity onPress={handleCartToggle}>
            <AntDesign
              name="heart"
              size={24}
              color={isInCart(fish.id) ? "red" : "black"}
            />
          </TouchableOpacity>
          <Button title="Compare" onPress={() => onSelect(fish)} />
        </View>

        <Text className="text-sm text-gray-500">
          Origin: {fish.origin} | Gender: {fish.gender}
        </Text>

        <View className="mt-2 flex-col justify-between">
          <Text className="text-xs text-gray-500">
            Length: {fish.length} cm
          </Text>
          <Text className="text-xs text-gray-500">
            Last Check:{" "}
            {new Date(`${fish.lastHealthCheck}`).toLocaleDateString("en-GB")}
          </Text>
        </View>

        {fish.isAvailableForSale && (
          <View className="mt-2 flex-row items-center">
            <Feather name="tag" size={12} color="green" />
            <Text className="ml-1 text-sm text-green-600">
              {fish.price.toFixed(0)} VND
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

function FishItemSkeleton() {
  return (
    <View className="mb-4 rounded-xl border border-gray-200 bg-white">
      <Skeleton className="h-40 w-full !rounded-t-xl" variant="sharp" />
      <View className="p-4">
        <Skeleton className="mb-2 h-6 w-3/4 !rounded-md" variant="sharp" />
        <Skeleton className="mb-2 h-4 w-1/2 !rounded-md" variant="sharp" />

        <View className="mt-2 flex-row justify-between">
          <Skeleton className="h-4 w-1/3" variant="rounded" />
          <Skeleton className="h-4 w-1/3" variant="rounded" />
        </View>

        <Skeleton className="mt-2 h-4 w-1/4" variant="rounded" />
      </View>
    </View>
  );
}

export { FishItem, FishItemSkeleton };
