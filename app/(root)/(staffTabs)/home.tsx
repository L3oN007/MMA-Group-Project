import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import FishList from '@/components/fish/fish-list'

export default function home() {
  return (
    <SafeAreaView className="flex h-full bg-gray-50">
      <View className="p-4 w-full">
        <Text className="mb-4 text-2xl font-bold text-black">Fish available</Text>
        <FishList />
      </View>
    </SafeAreaView>
  )
}