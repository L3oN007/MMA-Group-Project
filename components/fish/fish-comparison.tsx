import React from "react";
import { View, Text, Pressable, Modal, ScrollView } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { IFish } from "@/types/fish.type";
import { router } from "expo-router";

type ComparisonPopupProps = {
  fishA: IFish;
  fishB: IFish;
  onClose: () => void;
};

const ComparisonPopup = ({ fishA, fishB, onClose }: ComparisonPopupProps) => {
  const highlightDiff = (attr: string) =>
    fishA[attr] !== fishB[attr] ? "text-red-500" : "text-black";

  return (
    <Modal transparent={true} animationType="slide">
      <View className="flex-1 justify-center bg-black bg-opacity-50 p-6">
        <View className="bg-white rounded-lg p-4 shadow-lg">
          <View className="flex-row justify-between mb-4">
            <Text className="text-lg font-semibold">Fish Comparison</Text>
            <Pressable onPress={onClose}>
              <Feather name="x" size={24} color="black" />
            </Pressable>
          </View>
          <ScrollView>
            <View className="flex-row justify-between mb-2">
              <Text className="font-semibold">Attribute</Text>
              <Text className="font-semibold">{fishA.name}</Text>
              <Text className="font-semibold">{fishB.name}</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text>Breed</Text>
              <Text className={highlightDiff("koiBreeds")}>
                {fishA.koiBreeds.map(b => b.name).join(", ")}
              </Text>
              <Text className={highlightDiff("koiBreeds")}>
                {fishB.koiBreeds.map(b => b.name).join(", ")}
              </Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text>Length</Text>
              <Text className={highlightDiff("length")}>{fishA.length} cm</Text>
              <Text className={highlightDiff("length")}>{fishB.length} cm</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text>Weight</Text>
              <Text className={highlightDiff("weight")}>{fishA.weight} g</Text>
              <Text className={highlightDiff("weight")}>{fishB.weight} g</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text>Price</Text>
              <Text className={highlightDiff("price")}>${fishA.price}</Text>
              <Text className={highlightDiff("price")}>${fishB.price}</Text>
            </View>

            <Pressable
              onPress={() => router.push(`/fish/${fishA.id}`)}
              className="bg-blue-500 mt-4 py-2 rounded"
            >
              <Text className="text-white text-center">View {fishA.name}</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push(`/fish/${fishB.id}`)}
              className="bg-blue-500 mt-2 py-2 rounded"
            >
              <Text className="text-white text-center">View {fishB.name}</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ComparisonPopup;
