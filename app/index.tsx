import React from "react";

import {
  Alert,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";

import { LoginFormSchema, LoginFormType } from "@/validators/auth.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";

import useAuth from "@/hooks/useAuth";

const LoginPage = () => {
  const { login } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    try {
      const res = await login.mutateAsync(data);
      console.log("res", res);
      Alert.alert(res.message);
    } catch (error) {
      Alert.alert("Login Failed");
    }
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-center bg-gray-50">
      <View className="w-full max-w-md px-4">
        <Text className="mb-4 text-2xl font-bold">Login</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="mb-4 rounded-lg border border-gray-300 px-4 py-2"
              placeholder="Email"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && (
          <Text className="mb-2 text-red-500">{errors.email.message}</Text>
        )}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="mb-4 rounded-lg border border-gray-300 px-4 py-2"
              placeholder="Password"
              secureTextEntry
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && (
          <Text className="mb-4 text-red-500">{errors.password.message}</Text>
        )}
        <Pressable
          className="bg-primary-600 rounded-lg px-4 py-2"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white">Login</Text>
        </Pressable>

        <Pressable
          className="mt-2 rounded-lg border border-gray-300 bg-white px-4 py-2"
          onPress={() => router.push("/home")}
        >
          <Text className="text-black">Go to Home page</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;
