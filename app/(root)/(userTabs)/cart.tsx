import React, { useCallback, useEffect, useState } from "react";

import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useFocusEffect } from "expo-router";

import { useCart } from "@/hooks/useCart";

export default function Cart() {
  const { cart, loadCart, addToCart, removeFromCart, clearCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  useFocusEffect(
    useCallback(() => {
      loadCart(); // This loads the cart from AsyncStorage
    }, [])
  );

  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  const calculateTotalPrice = () => {
    const total = cart.reduce(
      (sum, fish) => sum + fish.price * (fish.quantity || 1),
      0
    );
    setTotalPrice(total);
  };

  const incrementQuantity = (fish) => {
    const updatedFish = { ...fish, quantity: (fish.quantity || 1) + 1 };
    addToCart(updatedFish);
  };

  const decrementQuantity = (fish) => {
    if (fish.quantity && fish.quantity > 1) {
      const updatedFish = { ...fish, quantity: fish.quantity - 1 };
      addToCart(updatedFish);
    }
  };

  const confirmRemoveItem = (fishId) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from the cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => removeFromCart(fishId),
        },
      ]
    );
  };

  const confirmClearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to remove all items from the cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: clearCart,
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex h-full bg-gray-50 p-4">
      <View className="mb-4 flex-row justify-between">
        <Text className="text-2xl font-bold">Your Cart</Text>
        {cart.length > 0 && (
          <TouchableOpacity onPress={confirmClearCart} className="p-2">
            <Text className="font-semibold text-red-500">Clear Cart</Text>
          </TouchableOpacity>
        )}
      </View>

      {cart.length > 0 ? (
        <>
          <ScrollView className="flex-1">
            {cart.map((fish) => (
              <View
                key={fish.id}
                className="mb-4 flex-row items-center rounded-lg bg-gray-50 p-4 shadow-sm"
              >
                <Image
                  source={{ uri: fish.koiFishImages[0] || "" }}
                  className="mr-4 h-24 w-24 rounded-lg"
                  resizeMode="cover"
                />
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-black">
                    {fish.name}
                  </Text>
                  <Text className="text-gray-500">{fish.origin}</Text>
                  <Text className="font-bold text-green-600">{`${fish.price * (fish.quantity || 1)} VND`}</Text>

                  <View className="mt-2 flex-row items-center">
                    <TouchableOpacity
                      onPress={() => decrementQuantity(fish)}
                      className="mr-2 rounded-full bg-gray-200 px-2 py-1"
                    >
                      <AntDesign name="minus" size={16} color="black" />
                    </TouchableOpacity>
                    <Text className="mx-2">{fish.quantity || 1}</Text>
                    <TouchableOpacity
                      onPress={() => incrementQuantity(fish)}
                      className="ml-2 rounded-full bg-gray-200 px-2 py-1"
                    >
                      <AntDesign name="plus" size={16} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => confirmRemoveItem(fish.id)}
                  className="ml-4"
                >
                  <Feather name="trash" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View className="my-4 flex-row items-center justify-around border-t border-gray-200 pt-4">
            <Text className="mb-2 text-right text-lg font-bold text-black">{`Total: ${totalPrice.toFixed(0)} VND`}</Text>
            <TouchableOpacity
              onPress={() => alert("Proceeding to checkout...")}
              className="rounded-lg bg-blue-500 p-4"
            >
              <Text className="text-center font-semibold text-white">
                Check Out
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text className="flex-1 items-center justify-center text-center text-2xl">
          Your cart is empty
        </Text>
      )}
    </SafeAreaView>
  );
}
