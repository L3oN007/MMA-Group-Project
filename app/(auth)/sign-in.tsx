import React from "react";

import { Alert, Image, Text, View } from "react-native";

import icons from "@/constants/Icons";
import { images } from "@/constants/Image";
import useAuthStore from "@/stores/useAuthStore";
import { SignInFormSchema, SignInFormType } from "@/validators/auth.validator";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";

import { IUser, UserRole } from "@/types/user.type";

import { useSignIn } from "@/hooks/useAuth";

import CustomButton from "@/components/global/custom-button";
import InputField from "@/components/global/input-field";
import ParallaxScrollView from "@/components/global/parallax-scrool-view";
import { userService } from "@/services/users.service";
import { useUsers } from "@/hooks/useUser";

export default function SignIn() {
  const { setIsAuthenticated, setUser } = useAuthStore();
  const { mutateAsync: signIn, isPending: isSignInPending } = useSignIn();
  const { mutateAsync: getUserInfo, isPending: isGetting } = useUsers();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormType>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "123456",
    },
  });

  const user: IUser = {
    id: 1,
    fullName: "Nguyen Van A",
    unsignFullName: "nguyen van a",
    imageUrl: "https://example.com/profile.jpg",
    roleName: UserRole.USER,
    address: "123 Le Loi Street, District 1, Ho Chi Minh City",
    isActive: true,
    isDeleted: false,
    loyaltyPoints: 150,
    phoneNumber: "0901234567",
  };

  const onSubmit = async (values: SignInFormType) => {
    const data = await signIn(values);
    if (data.isSuccess) {
      // Init user data right after login
      await getUserInfo();
      setIsAuthenticated(true);

      // Navigate to corresponding route
      const tabsRole = userService.getUserTabsByRole(user.roleName);
      router.navigate(`/(${tabsRole})/profile_`);
    } else {
      Alert.alert("Fail to login");
    }
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#ffff", dark: "#ffff" }}
      headerImage={
        <Image source={images.koiBackground} className="z-0 h-[250px] w-full" />
      }
    >
      <View className="flex-1 bg-white">
        <View className="flex-1 bg-white">
          <Image source={images.logo} className="z-0 h-[200px] w-full" />
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
              disabled={isSignInPending}
              title="Sign In"
              className="mt-6"
              onPress={handleSubmit(onSubmit)}
            />
            <View className="mt-4 flex-row justify-center text-center">
              <Text className="text-center font-pregular text-general-200">
                Don't have an account?
              </Text>
              <Link href="/sign-up" className="ml-2 text-center font-pregular">
                <Text className="text-primary-500">Sign Up</Text>
              </Link>
            </View>
            <CustomButton
              title="Bypass Sign In"
              onPress={() => {
                setIsAuthenticated(true);
                setUser(user);
                router.navigate("/(root)/(userTabs)/home");
              }}
              bgVariant="secondary"
            />
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
      </View>
    </ParallaxScrollView>
  );
}
