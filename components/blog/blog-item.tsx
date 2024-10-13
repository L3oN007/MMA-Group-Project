import React from "react";

import { Image, Pressable, Text, View } from "react-native";

import { images } from "@/constants/Image";
import Feather from "@expo/vector-icons/Feather";
import { format } from "date-fns";
import { router } from "expo-router";

import { IBlog } from "@/types/blog.type";

import Skeleton from "@/components/global/skeleton";

type Props = {
  blog: IBlog;
};

function BlogItem({ blog }: Props) {
  return (
    <Pressable
      className="text-card-foreground mb-4 rounded-xl border border-gray-200 bg-white shadow"
      onPress={() => router.navigate(`/(root)/blog/${blog.id}`)}
    >
      <Image
        source={images.koiBackground2}
        className="h-40 w-full rounded-t-xl"
        resizeMode="center"
      />
      <View className="p-4">
        <View className="flex-row gap-x-2">
          {blog.tags.map((tag, index) => (
            <View
              key={index}
              className="rounded-lg bg-primary-400 px-2.5 py-0.5"
            >
              <Text className="text-xs font-semibold text-white">{tag}</Text>
            </View>
          ))}
        </View>

        <View className="mt-2">
          <Text className="font-psemibold text-base text-black">
            {blog.title}
          </Text>
          <Text
            numberOfLines={3}
            className="mt-2 font-pregular text-xs text-secondary-400"
          >
            {blog.content}
          </Text>

          <View className="mt-2 flex-row items-center">
            <Image
              source={images.logo}
              className="mr-2 h-10 w-10 rounded-full border border-secondary-200"
              resizeMode="contain"
            />
            <View>
              <Text className="text-sm font-medium text-gray-900">
                {blog.author}
              </Text>
              <Text className="text-xs text-gray-500">Koi Expert</Text>
            </View>
          </View>

          <View className="mt-4 flex-row justify-between">
            <Text className="font-pregular text-xs text-secondary-400">
              {format(new Date(blog.createdAt), "MMM d, yyyy")}
            </Text>
            <Text className="font-pregular text-xs text-secondary-400">
              <Feather name="clock" size={12} /> 5 min read
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

function BlogItemSkeleton() {
  return (
    <View className="text-card-foreground mb-4 rounded-xl border border-gray-200 bg-white">
      <Skeleton className="h-40 w-full !rounded-t-xl" variant="sharp" />
      <View className="p-4">
        <View className="flex-row gap-x-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-4 w-12 !rounded-md"
              variant="sharp"
            />
          ))}
        </View>

        <View className="mt-2">
          <Skeleton className="mb-4 h-8 w-[70%] !rounded-md" variant="sharp" />

          {/* Description Skeleton */}
          <View className="flex-col gap-1">
            <Skeleton className="h-4 w-full !rounded-md" variant="rounded" />
            <Skeleton className="h-4 w-[70%] !rounded-md" variant="rounded" />
          </View>

          <View className="mt-2 flex-row items-center">
            <Skeleton className="mr-2 h-10 w-10" variant="circular" />
            <View>
              <Skeleton className="mb-1 h-4 w-16" variant="rounded" />

              <Skeleton className="h-3 w-8" variant="rounded" />
            </View>
          </View>

          <View className="mt-4 flex-row justify-between">
            <Skeleton className="mb-1 h-4 w-20" variant="rounded" />

            <Skeleton className="mb-1 h-4 w-20" variant="rounded" />
          </View>
        </View>
      </View>
    </View>
  );
}

export { BlogItem, BlogItemSkeleton };

