import React, { useCallback, useEffect, useState } from "react";

import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import { useFocusEffect } from "expo-router";

import { IDiet } from "@/types/diet.type";

import { useCart } from "@/hooks/useCart";
import { useDiet } from "@/hooks/useDiet";

// Define types for consignment

interface Consignment {
  isConsign: boolean;
  selectedDiet: IDiet | null;
  startDate: Date;
  endDate: Date;
  duration: number;
  estimatedCost: number;
}

interface Consignments {
  [fishId: string]: Consignment;
}

export default function Cart() {
  const { cart, loadCart, removeFromCart, clearCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [consignments, setConsignments] = useState<Consignments>({});
  const [showDatePicker, setShowDatePicker] = useState<{
    fishId: string | null;
    mode: "start" | "end" | null;
  }>({ fishId: null, mode: null });

  const today = new Date();

  // Use the useDiet hook to get diet data
  const { data: diets, isLoading, isError } = useDiet();

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [])
  );

  useEffect(() => {
    calculateTotalPrice();
  }, [cart, consignments]);

  const calculateTotalPrice = () => {
    let total = cart.reduce((sum, fish) => sum + fish.price, 0);

    for (const fishId in consignments) {
      const consignment = consignments[fishId];
      if (
        consignment.isConsign &&
        consignment.selectedDiet &&
        consignment.duration
      ) {
        total += consignment.selectedDiet.dietCost * consignment.duration;
      }
    }

    setTotalPrice(total);
  };

  const confirmRemoveItem = (fishId: number) => {
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

  const handleConsignToggle = (fishId: string) => {
    setConsignments((prevConsignments) => ({
      ...prevConsignments,
      [fishId]: {
        ...prevConsignments[fishId],
        isConsign: !prevConsignments[fishId]?.isConsign,
        selectedDiet: null,
        startDate: today,
        endDate: today,
        duration: 1,
        estimatedCost: 0,
      },
    }));
  };

  const handleDateChange = (
    selectedDate: Date | undefined,
    fishId: string,
    mode: "start" | "end"
  ) => {
    if (selectedDate) {
      setConsignments((prevConsignments) => {
        let startDate = prevConsignments[fishId].startDate;
        let endDate = prevConsignments[fishId].endDate;

        if (mode === "start") {
          startDate = selectedDate;
          if (startDate > endDate) endDate = startDate;
        } else if (mode === "end") {
          endDate = selectedDate;
          if (endDate < startDate) startDate = endDate;
        }

        const duration = Math.max(
          1,
          Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
          )
        );
        const estimatedCost = prevConsignments[fishId].selectedDiet
          ? prevConsignments[fishId].selectedDiet.dietCost * duration
          : 0;

        return {
          ...prevConsignments,
          [fishId]: {
            ...prevConsignments[fishId],
            startDate,
            endDate,
            duration,
            estimatedCost,
          },
        };
      });
    }
    setShowDatePicker({ fishId: null, mode: null });
  };

  const handleDietChange = (fishId: string, selectedDiet: IDiet | null) => {
    setConsignments((prevConsignments) => {
      const duration = prevConsignments[fishId].duration || 1;
      const estimatedCost = selectedDiet ? selectedDiet.dietCost * duration : 0;
      return {
        ...prevConsignments,
        [fishId]: {
          ...prevConsignments[fishId],
          selectedDiet,
          estimatedCost,
        },
      };
    });
  };

  if (isLoading) return <Text>Loading diets...</Text>;
  if (isError) return <Text>Error loading diets</Text>;

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
            {cart.map((fish) => {
              const fishIdStr = fish.id.toString(); // Convert fish.id to string
              const consignment = consignments[fishIdStr] || {};
              return (
                <View
                  key={fish.id}
                  className="mb-4 rounded-lg bg-gray-50 p-4 shadow-sm"
                >
                  <Text className="text-lg font-semibold text-black">
                    {fish.name}
                  </Text>
                  <Text className="text-gray-500">{fish.origin}</Text>
                  <Text className="font-bold text-green-600">{`${fish.price} VND`}</Text>

                  <TouchableOpacity
                    onPress={() => confirmRemoveItem(fish.id)}
                    className="absolute right-4 top-4"
                  >
                    <Feather name="trash" size={24} color="red" />
                  </TouchableOpacity>

                  <View className="mt-2 flex-row items-center">
                    <Checkbox
                      value={consignment.isConsign || false}
                      onValueChange={() => handleConsignToggle(fishIdStr)}
                    />
                    <Text className="ml-2">Consign</Text>
                  </View>

                  {consignment.isConsign && (
                    <View className="mt-4 rounded-lg bg-gray-100 p-4">
                      <Text className="mb-2 font-semibold">
                        Consignment Configuration
                      </Text>
                      <Picker
                        selectedValue={consignment.selectedDiet}
                        onValueChange={(itemValue) =>
                          handleDietChange(fishIdStr, itemValue)
                        }
                      >
                        <Picker.Item label="Select diet" value={null} />
                        {diets?.map((diet, index) => (
                          <Picker.Item
                            key={index}
                            label={`${diet.name} - ${diet.dietCost} VND/day`}
                            value={diet}
                          />
                        ))}
                      </Picker>

                      <View className="mt-4 flex-row items-center justify-between">
                        <TouchableOpacity
                          onPress={() =>
                            setShowDatePicker({
                              fishId: fishIdStr,
                              mode: "start",
                            })
                          }
                          className="flex-row items-center rounded border p-2"
                        >
                          <Text>
                            {consignment.startDate?.toDateString() ||
                              today.toDateString()}
                          </Text>
                        </TouchableOpacity>
                        <Text>to</Text>
                        <TouchableOpacity
                          onPress={() =>
                            setShowDatePicker({
                              fishId: fishIdStr,
                              mode: "end",
                            })
                          }
                          className="flex-row items-center rounded border p-2"
                        >
                          <Text>
                            {consignment.endDate?.toDateString() ||
                              today.toDateString()}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <Text className="mt-2">
                        Duration: {consignment.duration || 0} days
                      </Text>

                      <Text className="mt-4">
                        Daily Cost:{" "}
                        {consignment.selectedDiet
                          ? `${consignment.selectedDiet.dietCost} VND`
                          : "N/A"}
                      </Text>
                      <Text className="mt-2">
                        Estimated Price: {consignment.estimatedCost || 0} VND
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>

          <View className="my-4 flex-row items-center justify-around border-t border-gray-200 pt-4">
            <Text className="text-lg font-bold">{`Total: ${totalPrice.toFixed(0)} VND`}</Text>
            <TouchableOpacity
              onPress={() => alert("Proceeding to checkout...")}
              className="rounded-lg bg-blue-500 p-4"
            >
              <Text className="text-center font-semibold text-white">
                Check Out
              </Text>
            </TouchableOpacity>
          </View>

          {showDatePicker.fishId && (
            <DateTimePicker
              value={
                showDatePicker.mode === "start"
                  ? consignments[showDatePicker.fishId]?.startDate || today
                  : consignments[showDatePicker.fishId]?.endDate || today
              }
              mode="date"
              display="default"
              minimumDate={
                showDatePicker.mode === "start"
                  ? today
                  : consignments[showDatePicker.fishId]?.startDate
              }
              maximumDate={
                showDatePicker.mode === "start"
                  ? consignments[showDatePicker.fishId]?.endDate
                  : undefined
              }
              onChange={(event, date) =>
                handleDateChange(
                  date,
                  showDatePicker.fishId as string,
                  showDatePicker.mode as "start" | "end"
                )
              }
            />
          )}
        </>
      ) : (
        <Text className="flex-1 items-center justify-center text-center text-2xl">
          Your cart is empty
        </Text>
      )}
    </SafeAreaView>
  );
}
