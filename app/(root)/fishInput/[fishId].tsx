import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, SafeAreaView, TextInput, Pressable } from "react-native";
import { useFishById } from "@/hooks/useFish";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams } from 'expo-router';
import { IFish } from "@/types/fish.type";
import { format } from "date-fns";
import fishService from "@/services/fish.service";
import useAuthStore from "@/stores/useAuthStore";


const inputStyle = "p-1 border border-solid border-slate-200 rounded";

export default function fishInput() {
    const { token } = useAuthStore();
    const { fishId } = useLocalSearchParams();
    const { data, isLoading, isError } = useFishById(fishId as string);

    const [interactedFish, setInteractedFish] = useState<IFish | undefined>();

    useEffect(() => {
        setInteractedFish(data);
    }, [data]);

    const onUpdateFishInfo = <T extends keyof IFish>(key: T, value: IFish[T]) => {
        if (!interactedFish) return;
        if (Number.isNaN(value)) return;

        const newFish: IFish = JSON.parse(JSON.stringify(interactedFish));
        newFish[key] = value;
        setInteractedFish(newFish);
    }

    const onUpdateFishBreed = (index: number, value: string) => {
        if (!interactedFish) return;

        const newFish: IFish = JSON.parse(JSON.stringify(interactedFish));
        newFish.koiBreeds[index].name = value;
        setInteractedFish(newFish);
    }

    const onAddFishBreed = () => {
        if (!interactedFish) return;

        const newFish: IFish = JSON.parse(JSON.stringify(interactedFish));
        newFish.koiBreeds.push({ id: 0, name: "", content: "", imageUrl: "", isDeleted: false });
        setInteractedFish(newFish);
    }

    const onRemoveBreed = (index: number) => {
        if (!interactedFish) return;

        const newFish: IFish = JSON.parse(JSON.stringify(interactedFish));
        newFish.koiBreeds = [...newFish.koiBreeds.slice(0, index), ...newFish.koiBreeds.slice(index + 1, newFish.koiBreeds.length)];
        setInteractedFish(newFish);
    }

    const onSwapGender = () => {
        if (!interactedFish) return;

        const newFish: IFish = JSON.parse(JSON.stringify(interactedFish));
        newFish.gender = newFish.gender === "Female" ? "Male" : "Female";

        setInteractedFish(newFish);
    }

    const onSubmit = () => {
        if(!token || !interactedFish) return;
        fishService.updateFish(fishId as string, token, interactedFish as IFish);
    }

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-gray-50">
                <Text>Loading fish details...</Text>
            </SafeAreaView>
        );
    }

    if (isError || !data) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-gray-50">
                <Text className="text-red-500">Error loading fish details!</Text>
            </SafeAreaView>
        );
    }

    return (
        <ScrollView className="flex-1 bg-white">
            <Image
                source={{ uri: interactedFish?.koiFishImages[0] || "default_image_url" }}
                className="h-56 w-full"
                resizeMode="cover"
            />
            <View className="p-4">
                <TextInput onChangeText={(e) => onUpdateFishInfo('name', e)} className={`text-2xl font-semibold text-gray-800 ${inputStyle}`} value={interactedFish?.name} />
                <View className="flex flex-row mt-2">
                    <Text className="text-base text-gray-500">Origin:</Text>
                    <TextInput onChangeText={(e) => onUpdateFishInfo('origin', e)} className={`w-6/12 ml-2 ${inputStyle}`} value={interactedFish?.origin} />
                </View>

                <View className="mt-4 border-t border-gray-200 pt-4">
                    <Text className="text-lg font-semibold text-gray-700">Details</Text>

                    <View className="mt-2">
                        <View className="flex-row justify-between">
                            <Text className="text-gray-600">Gender:</Text>
                            <View className="flex flex-row">
                                <Text className="text-gray-800 mr-1">{interactedFish?.gender}</Text>
                                <MaterialCommunityIcons onPress={onSwapGender} name="swap-horizontal-circle" size={18} color="black" />
                            </View>
                        </View>

                        <View className="flex-row justify-between mt-2">
                            <Text className="text-gray-600">Length:</Text>
                            <View className="w-4/12 flex flex-row items-center pr1-3">
                                <TextInput onChangeText={(e) => onUpdateFishInfo('length', Number(e))} keyboardType="numeric" className={`w-10/12 ml-2 text-right mr-1 ${inputStyle}`} value={(interactedFish?.length || 0).toString()} />
                                <Text className="text-gray-800">cm</Text>
                            </View>
                        </View>

                        <View className="flex-row justify-between mt-2">
                            <Text className="text-gray-600">Weight:</Text>
                            <View className="w-4/12 flex flex-row items-center pr-3">
                                <TextInput onChangeText={(e) => onUpdateFishInfo('weight', Number(e))} keyboardType="numeric" className={`w-10/12 ml-2 text-right mr-1 ${inputStyle}`} value={(interactedFish?.weight.toString() || 0).toString()} />
                                <Text className="text-gray-800">g</Text>
                            </View>
                        </View>

                        <View className="flex-row justify-between mt-2">
                            <Text className="text-gray-600">Daily Feed Amount:</Text>
                            <View className="w-4/12 flex flex-row items-center pr-3">
                                <TextInput onChangeText={(e) => onUpdateFishInfo('dailyFeedAmount', Number(e))} keyboardType="numeric" className={`w-10/12 ml-2 text-right mr-1 ${inputStyle}`} value={(interactedFish?.dailyFeedAmount ?? 0).toString()} />
                                <Text className="text-gray-800">g</Text>
                            </View>
                        </View>

                        <View className="flex-row justify-between mt-2">
                            <Text className="text-gray-600">Last Health Check:</Text>
                            <View className="w-4/12 flex flex-row items-center pr-3">
                                <TextInput onChangeText={(e) => onUpdateFishInfo('lastHealthCheck', e)} maxLength={10} className={`w-full ml-2 text-right mr-1 ${inputStyle}`} value={interactedFish?.lastHealthCheck ? format(interactedFish?.lastHealthCheck, "dd/MM/yyyy") : ""} />
                            </View>
                            {/* {format(new Date(interactedFish?.lastHealthCheck), "dd/MM/yyyy")} */}
                        </View>
                    </View>

                    {/* Breed Information */}
                    <View className="mt-4 border-t border-gray-200 pt-4">
                        <Text className="text-lg font-semibold text-gray-700">Breeds</Text>
                        {interactedFish?.koiBreeds && interactedFish?.koiBreeds.length > 0 ? (
                            interactedFish?.koiBreeds.map((breed, index) => (
                                <View key={index} className="mt-2 flex flex-row items-center">
                                    <TextInput placeholder="Breed name" onChangeText={(e) => onUpdateFishBreed(index, e)} className={`w-8/12 text-gray-800 font-medium mr-2 ${inputStyle}`} value={breed.name} />
                                    <Ionicons onPress={() => onRemoveBreed(index)} name="trash-bin-sharp" size={15} color="red" />
                                </View>
                            ))
                        ) : (
                            <Text className="text-gray-600 text-sm">No breed information available.</Text>
                        )}
                        <Pressable onPress={onAddFishBreed} className="w-8/12 bg-gray-300 font-bold rounded mt-2 p-1">
                            <Text className="text-center">ADD</Text>
                        </Pressable>
                    </View>

                    <View className="mt-4 border-t border-gray-200 pt-4">
                        <Text className="text-lg font-semibold text-gray-700">Personality Traits</Text>
                        <TextInput onChangeText={(e) => onUpdateFishInfo('personalityTraits', e)} className={`text-gray-600 mt-2 ${inputStyle}`} value={interactedFish?.personalityTraits} />
                    </View>

                    <View className="mt-4 mb-8 border-t border-gray-200 pt-4">
                        <Text className="text-lg font-semibold text-gray-700">Price</Text>
                        <View className="w-8/12 flex flex-row items-center mr-2">
                            <TextInput onChangeText={(e) => onUpdateFishInfo('price', Number(e))} keyboardType="numeric" className={`w-8/12 text-gray-600 mr-2 ${inputStyle}`} value={(interactedFish?.price ?? 0).toString()} />
                            <Text className="text-gray-600 mt-2">VND</Text>
                        </View>
                    </View>

                    <View>
                        <Pressable onPress={onSubmit} className="w-full bg-primary-600 font-bold rounded-2xl p-3">
                            <Text className="text-center text-white font-semibold">UPDATE</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}