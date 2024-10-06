import React from "react";

import { Alert, Image, ScrollView, Text, View } from "react-native";

import icons from "@/constants/Icons";
import { images } from "@/constants/Image";
import { SignInFormSchema, SignInFormType } from "@/validators/auth.validator";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";

import useAuth from "@/hooks/useAuth";

import CustomButton from "@/components/global/custom-button";
import InputField from "@/components/global/input-field";

export default function SignIn() {
  const { login } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormType>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormType) => {
    Alert.alert(JSON.stringify(data));
  };
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative h-[250px] w-full">
          <View className="absolute inset-0 z-10" />
          <Image
            source={images.koiBackground}
            className="z-0 h-[250px] w-full"
          />
          {/* This the view */}
          <View />
          <Text className="absolute bottom-5 left-5 z-20 font-psemibold text-2xl text-white">
            Sign In to Your Account
          </Text>
        </View>

        <View className="p-5">
          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Email"
                placeholder="Enter email"
                icon={icons.email}
                placeholderTextColor={"gray"}
                textContentType="emailAddress"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <Text className="text-red-500">{message}</Text>
            )}
          />
          {/* Email */}

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Password"
                placeholder="Enter password"
                icon={icons.lock}
                placeholderTextColor={"gray"}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <Text className="text-red-500">{message}</Text>
            )}
          />
          {/* Password */}

          <CustomButton
            title="Sign In"
            className="mt-6"
            onPress={handleSubmit(onSubmit)}
          />
          <View className="mt-4 flex-row justify-center text-center">
            <Text className="text-general-200 text-center font-pregular">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="ml-2 text-center font-pregular">
              <Text className="text-primary-500">Sign Up</Text>
            </Link>
          </View>
        </View>
        {/* <ReactNativeModal
        isVisible={verification.state === "pending"}
        // onBackdropPress={() =>
        //   setVerification({ ...verification, state: "default" })
        // }
        onModalHide={() => {
          if (verification.state === "success") {
            setShowSuccessModal(true);
          }
        }}
      >
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Text className="font-JakartaExtraBold text-2xl mb-2">
            Verification
          </Text>
          <Text className="font-Jakarta mb-5">
            We've sent a verification code to {form.email}.
          </Text>
          <InputField
            label={"Code"}
            icon={icons.lock}
            placeholder={"12345"}
            value={verification.code}
            keyboardType="numeric"
            onChangeText={(code) =>
              setVerification({ ...verification, code })
            }
          />
          {verification.error && (
            <Text className="text-red-500 text-sm mt-1">
              {verification.error}
            </Text>
          )}
          <CustomButton
            title="Verify Email"
            onPress={onPressVerify}
            className="mt-5 bg-success-500"
          />
        </View>
      </ReactNativeModal>
      <ReactNativeModal isVisible={showSuccessModal}>
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Image
            source={images.check}
            className="w-[110px] h-[110px] mx-auto my-5"
          />
          <Text className="text-3xl font-JakartaBold text-center">
            Verified
          </Text>
          <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
            You have successfully verified your account.
          </Text>
          <CustomButton
            title="Browse Home"
            onPress={() => router.push(`/(root)/(tabs)/home`)}
            className="mt-5"
          />
        </View>
      </ReactNativeModal> */}
      </View>
    </ScrollView>
  );
}

