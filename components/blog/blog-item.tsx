import React from "react";

import { Image, Text, View } from "react-native";

import { images } from "@/constants/Image";
import Feather from "@expo/vector-icons/Feather";
import { format } from "date-fns";

import { IBlog } from "@/types/blog.type";

type Props = {
  blog: IBlog;
};

function BlogItem({ blog }: Props) {
  return (
    <View className="text-card-foreground mb-4 rounded-xl border border-gray-200 bg-white shadow">
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
    </View>
  );
}

function BlogItemSkeleton() {
  return (
    <View className="text-card-foreground mb-4 rounded-xl border border-gray-200 bg-white shadow">
      <Image
        source={images.koiBackground2}
        className="h-40 w-full rounded-t-xl"
        resizeMode="center"
      />
      <View className="p-4">
        {/* <View className="flex-row gap-x-2">
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
    </View> */}
      </View>
    </View>
  );
}

export { BlogItem, BlogItemSkeleton };

