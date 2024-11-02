import React, { useState } from "react";

import { Alert, Animated, Image, PanResponder, Pressable, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";

import { IFish } from "@/types/fish.type";
import Skeleton from "@/components/global/skeleton";
import useAuthStore from "@/stores/useAuthStore";
import { UserRole } from "@/types/user.type";
import fishService from "@/services/fish.service";
import { VnDong } from "@/utils/format";

type Props = {
  fish: IFish;
  onTriggerUpdatedFish: () => void;
};

function FishItemManage({ fish, onTriggerUpdatedFish }: Props) {
  const { user, token } = useAuthStore();

  const [currItemPos, setCurrItemPos] = useState<number>(0);

  const onCheckPermission = () => {
    if (!user) return false;

    const allowedManageRole: UserRole[] = [UserRole.STAFF];
    return allowedManageRole.includes(user.roleName);
  }

  const onAskDelete = () => {
    Alert.alert(
      'Delete confirmation',
      `You are going to delete fish '${fish.name}'`,
      [
        {
          text: 'Cancel',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            onDeleteFishBy();
          },
        },
      ],
      { cancelable: false }
    );
  }

  const onDeleteFishBy = async () => {
    if (!onCheckPermission() || !token) return;

    const deleteResult = await fishService.deleteFishById(fish.id, token);

    if (deleteResult) {
      onTriggerUpdatedFish();
      Alert.alert("Deleted successfully");
      return;
    }

    Alert.alert("Failed to delete");
  }

  const translateX = new Animated.Value(0);
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove(e, gestureState) {
      if (!onCheckPermission()) return;
      translateX.setValue(currItemPos + gestureState.dx);

      if (Math.abs(gestureState.dx) < 5) return;
      // setIsSwipingAnimate(true);
    },
    onPanResponderRelease(e, gestureState) {
      if (!onCheckPermission()) return;
      if (gestureState.dx < 0) {
        translateX.setValue(-292);
        setCurrItemPos(-292);
      }
      if (gestureState.dx >= 0) {
        translateX.setValue(0);
        setCurrItemPos(0);
      }
    },
  });

  const onEditFish = () => {
    router.navigate(`/fishInput/${fish.id}`);
  }

  return (
    <Animated.View
      style={{
        transform: [{ translateX: translateX }],
      }}>

      <Pressable onPress={onEditFish} className="absolute flex justify-center items-center w-36 bg-gray-600" style={{ right: -146, height: '95%' }}>
        <Text className="text-white">Edit</Text>
      </Pressable>
      <Pressable onPress={onAskDelete} className="absolute flex justify-center items-center w-36 bg-red-600" style={{ right: -292, height: '95%' }}>
        <Text className="text-white">Delete</Text>
      </Pressable> 

      <View {...panResponder.panHandlers}>
        <Pressable
          style={{ zIndex: 1 }}
          className="mb-4 rounded-xl border border-gray-200 bg-white shadow"
        >
          <Image
            source={{
              uri: "https://storage.googleapis.com/pod_public/1300/135218.jpg",
            }}
            className="h-40 w-full rounded-t-xl"
            resizeMode="cover"
          />
          <View className="p-4">
            <Text className="font-semibold text-lg text-black">
              {fish.name}
            </Text>
            <Text className="text-sm text-gray-500">
              Origin: {fish.origin} | Gender: {fish.gender}
            </Text>

            <View className="mt-2 flex-col justify-between">
              <Text className="text-xs text-gray-500">
                Length: {fish.length} cm
              </Text>
              <Text className="text-xs text-gray-500">
                Last Check: {new Date(`${fish.lastHealthCheck}`).toLocaleDateString("en-GB")}
              </Text>
            </View>

              <View className="mt-2 flex-row items-center">
                <Feather name="tag" size={12} color="green" />
                <Text className="ml-1 text-sm text-green-600">
                  {VnDong.format(fish.price)}
                </Text>
              </View>

              <View className="mt-2 flex-row items-center">
                <Text className="ml-1 text-sm text-green-600" style={{color: fish.isAvailableForSale ? "green" : "red"}}>
                  {fish.isAvailableForSale ? "Avaiable for sale" : "Not avaiable for sale"}
                </Text>
              </View>
          </View>
        </Pressable>
      </View>
    </Animated.View>
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

export { FishItemManage, FishItemSkeleton };
