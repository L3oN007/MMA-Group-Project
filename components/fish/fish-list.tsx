import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useFish } from "@/hooks/useFish";
import { FishItem, FishItemSkeleton } from "@/components/fish/fish-item";
import ComparisonPopup from "@/components/fish/fish-comparison";
import { IFish } from "@/types/fish.type";

export default function FishList() {
  const { data: fishList, isLoading, isError } = useFish();
  const [selectedFish, setSelectedFish] = useState<IFish[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const toggleFishSelection = (fish: IFish) => {
    setSelectedFish(prev => {
      const isSelected = prev.find(item => item.id === fish.id);
      if (isSelected) {
        return prev.filter(item => item.id !== fish.id);
      } else if (prev.length < 2) {
        return [...prev, fish];
      }
      return prev;
    });
  };

  useEffect(() => {
    if (selectedFish.length === 2) {
      setShowComparison(true);
    } else {
      setShowComparison(false);
    }
  }, [selectedFish]);

  const openComparisonPopup = () => {
    if (selectedFish.length === 2) {
      setShowComparison(true);
    }
  };


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
        {isError && (
          <Text className="text-gray-500">
\          </Text>
        )}
      </SafeAreaView>
    );
  }

  return (
    <View>
      {!isLoading && !isError && fishList && (
        <FlatList
          data={fishList}
          renderItem={({ item }) => (
            <FishItem
              fish={item}
              onSelect={() => {
                toggleFishSelection(item);
                openComparisonPopup();
              }}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={<Text>No fish to display.</Text>}
        />
      )}
      {showComparison && selectedFish.length === 2 && (
        <ComparisonPopup
          fishA={selectedFish[0]}
          fishB={selectedFish[1]}
          onClose={() => {
            setShowComparison(false);
            setSelectedFish([]);
          }}
        />
      )}
    </View>
  )
}
