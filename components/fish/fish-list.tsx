import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useFish } from "@/hooks/useFish";
import { FishItem, FishItemSkeleton } from "@/components/fish/fish-item";
import ComparisonPopup from "@/components/fish/fish-comparison";
import { IFish } from "@/types/fish.type";
import useAuthStore from "@/stores/useAuthStore";
import { UserRole } from "@/types/user.type";
import { FishItemManage } from "./fish-item-manage";

export default function FishList() {
  const { user } = useAuthStore();
  const { data: fishList, refetch: refreshFishList, isLoading, isError } = useFish();
  const [selectedFish, setSelectedFish] = useState<IFish[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const onTriggerUpdatedFish = () => {
    refreshFishList();
  }

  const onCheckPermission = () => {
    if (!user) return false;

    const allowedManageRole: UserRole[] = [UserRole.STAFF];
    return allowedManageRole.includes(user.roleName);
  }

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

  if (onCheckPermission()) {
    return (
      <FlatList
        data={fishList}
        renderItem={({ item }) => <FishItemManage onTriggerUpdatedFish={onTriggerUpdatedFish} fish={item} />}
        keyExtractor={(item) => item.id.toString()} // Ensure id is a string
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <SafeAreaView className="my-10 flex-1 items-center justify-center bg-gray-50">
            <Text className="text-gray-500">No fish to display.</Text>
          </SafeAreaView>
        }
      />
    )
  }

  return (
    <View className="mb-14">
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
