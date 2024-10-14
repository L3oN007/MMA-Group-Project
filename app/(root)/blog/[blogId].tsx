import React, { useCallback, useState } from "react";

import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { images } from "@/constants/Image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { router, useGlobalSearchParams } from "expo-router";

import { useBlogById } from "@/hooks/useBlog";

export default function BlogDetail() {
  const queryClient = useQueryClient();
  const { blogId } = useGlobalSearchParams();
  const { data: blog, isLoading, isError } = useBlogById(blogId as string);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await queryClient.invalidateQueries({
        queryKey: ["blog", blogId],
      });
    } finally {
      setRefreshing(false);
    }
  }, [queryClient, blogId]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex h-full items-center justify-center bg-white">
        <Text className="text-lg text-gray-500">Loading...</Text>
      </SafeAreaView>
    );
  }

  if (isError || !blog) {
    return (
      <SafeAreaView className="flex h-full items-center justify-center bg-white">
        <Text className="text-lg text-red-500">Error loading blog!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex h-full flex-col bg-white px-4 py-6">
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="mb-2 px-4">
          <Text className="text-xl font-bold text-primary-400">Blog</Text>
        </View>

        <View className="px-4">
          <Text className="font-pregular text-xs text-gray-400">
            {format(new Date(blog.createdAt), "EEEE, MMM d, yyyy")}
          </Text>
          {/* Blog Title */}
          <Text className="mt-2 text-2xl font-bold tracking-tighter text-gray-800">
            {blog.title}
          </Text>

          {/* Tags Section */}
          <View className="mt-4 flex flex-row flex-wrap gap-x-2">
            {blog.tags.map((tag, index) => (
              <View
                key={index}
                className="rounded-md bg-primary-400 px-2.5 py-0.5"
              >
                <Text className="text-xs font-semibold text-white">{tag}</Text>
              </View>
            ))}
          </View>

          {/* Blog Image */}
          <Image
            source={images.koiBackground2}
            className="mt-4 h-64 w-full rounded-lg object-cover"
            resizeMode="cover"
          />

          {/* Blog Content */}
          <Text className="mt-6 text-base leading-relaxed text-gray-700">
            {blog.content}
          </Text>

          {/* Comments Section */}
          <View className="mt-8">
            <Text className="font-psemibold text-xl text-gray-800">
              Comments ({blog.comments.length})
            </Text>
            {blog.comments.length === 0 ? (
              <Text className="mt-4 text-gray-600">No comments yet.</Text>
            ) : (
              blog.comments.map((comment, index) => (
                <View key={index} className="mt-4 pb-4">
                  <View className="flex-row items-center">
                    <Image
                      source={images.logo}
                      className="mr-2 h-10 w-10 rounded-full border border-secondary-200"
                      resizeMode="contain"
                    />
                    <View>
                      <Text className="text-sm font-medium text-gray-900">
                        {comment.user}
                      </Text>

                      <Text className="text-xs text-gray-500">
                        {format(new Date(comment.createdAt), "MMM d, yyyy")}
                      </Text>
                    </View>
                  </View>
                  <Text className="mt-2 tracking-tight text-gray-700">
                    {comment.comment}
                  </Text>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View className="shadow-t-md flex h-12 flex-row items-center justify-between border-t border-zinc-200 bg-white px-4 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex flex-row items-center"
        >
          <Ionicons name="arrow-back" size={23} />
        </TouchableOpacity>
        {/* Add any other buttons or actions here */}
      </View>
    </SafeAreaView>
  );
}

