import React, { useCallback } from "react";

import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Import useFocusEffect
import useAuthStore from "@/stores/useAuthStore";
import { useFocusEffect } from "@react-navigation/native";

import { IFish } from "@/types/fish.type";

import { useCart } from "@/hooks/useCart";

import CustomButton from "@/components/global/custom-button";

export default function Profile() {
  const { user, onLogout } = useAuthStore();
  const { cart, removeFromCart, clearCart, loadCart } = useCart();

  // Reload the cart data each time this screen is focused
  useFocusEffect(
    useCallback(() => {
      loadCart(); // This loads the cart from AsyncStorage
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 justify-between bg-gray-100">
      <View className="p-4">
        {/* User Information */}
        <View className="flex-row gap-4">
          {user?.imageUrl ? (
            <Image
              source={{ uri: user.imageUrl }}
              className="mb-4 h-24 w-24 rounded-full border-2 border-blue-500"
            />
          ) : (
            <View className="mb-4 h-24 w-24 items-center justify-center rounded-full bg-gray-300">
              <Text className="text-xl text-gray-600">No Image</Text>
            </View>
          )}
          <View className="flex-col items-center justify-center">
            <Text className="text-2xl font-bold text-gray-800">
              {user?.fullName}
            </Text>
            <Text className="mb-6 text-sm text-gray-500">{user?.roleName}</Text>
          </View>
        </View>

        {/* Contact Information */}
        <View className="mb-4 w-full px-4">
          <Text className="text-lg font-semibold text-gray-800">
            Contact Information
          </Text>
          <Text className="mt-2 text-gray-700">
            Phone: {user?.phoneNumber || "N/A"}
          </Text>
          <Text className="mt-1 text-gray-700">
            Address: {user?.address || "N/A"}
          </Text>
        </View>

        {/* Cart Section */}
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <Text className="mb-2 text-xl font-semibold">My Cart</Text>

          {cart.length === 0 ? (
            <Text className="text-gray-500">Your cart is empty.</Text>
          ) : (
            cart.map((fish: IFish) => (
              <View
                key={fish.id}
                className="flex-row items-center justify-between border-b border-gray-200 py-2"
              >
                <Text>{fish.name}</Text>
                <TouchableOpacity
                  onPress={() => removeFromCart(fish.id)}
                  className="rounded bg-red-500 px-4 py-1"
                >
                  <Text className="text-white">Remove</Text>
                </TouchableOpacity>
              </View>
            ))
          )}

          {/* Clear Cart Button */}
          {cart.length > 0 && (
            <TouchableOpacity
              onPress={clearCart}
              className="mt-4 rounded bg-red-500 p-2"
            >
              <Text className="text-center text-white">Clear Cart</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>

      {/* Logout Button */}
      <View className="p-4">
        <CustomButton
          title="Logout"
          onPress={onLogout}
          className="rounded-md bg-red-500 py-3 text-lg font-semibold text-white"
        />
      </View>
    </SafeAreaView>
  );
}
