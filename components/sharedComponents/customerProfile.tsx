import React, { useCallback, useState } from "react";

import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { userService } from "@/services/users.service";
import useAuthStore from "@/stores/useAuthStore";
import { VnDong } from "@/utils/format";
import { useFocusEffect } from "@react-navigation/native";

import { IWallet } from "@/types/user.type";

import { useDeposit } from "@/hooks/useDeposit";

import CustomButton from "@/components/global/custom-button";

export default function CustomerProfile() {
  const { user, onLogout, token } = useAuthStore();
  const [wallet, setWallet] = useState<IWallet>({} as IWallet);
  const [loading, setLoading] = useState(true);
  const [depositAmount, setDepositAmount] = useState("");
  const { mutate: deposit, status: depositStatus } = useDeposit();

  const depositLoading = depositStatus === "pending";

  useFocusEffect(
    useCallback(() => {
      const fetchWallet = async () => {
        if (!token) return;

        setLoading(true);
        try {
          const walletData = await userService.getUserWallet(token);
          setWallet(walletData.data);
        } catch (error) {
          const err = error as Error;
          console.error("Failed to fetch wallet data:", err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchWallet();
    }, [token])
  );

  const handleDeposit = () => {
    const amount = parseInt(depositAmount, 10);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Error", "Please enter a valid deposit amount.");
      return;
    }
    deposit(amount);
  };

  return (
    <SafeAreaView className="flex-1 justify-between bg-gray-50">
      <View className="p-4">
        {/* User Information */}
        <View className="mb-6 flex-row items-center gap-4">
          {user?.imageUrl ? (
            <Image
              source={{ uri: user.imageUrl }}
              className="h-24 w-24 rounded-full border-2 border-blue-500"
            />
          ) : (
            <View className="h-24 w-24 items-center justify-center rounded-full bg-gray-300">
              <Text className="text-xl text-gray-600">No Image</Text>
            </View>
          )}
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-800">
              {user?.fullName}
            </Text>
            <Text className="text-sm text-gray-500">{user?.roleName}</Text>
          </View>
        </View>

        {/* Contact Information */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-800">
            Contact Information
          </Text>
          <View className="mt-2 rounded-lg bg-white p-4 shadow-sm">
            <Text className="text-gray-700">
              Phone: {user?.phoneNumber || "N/A"}
            </Text>
            <Text className="mt-1 text-gray-700">
              Address: {user?.address || "N/A"}
            </Text>
          </View>
        </View>

        {/* Wallet Information */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-800">Wallet</Text>
          <View className="mt-2 rounded-lg bg-blue-100 p-4 shadow-sm">
            {loading ? (
              <Text className="text-gray-600">Loading...</Text>
            ) : wallet ? (
              <>
                <Text className="font-semibold text-gray-700">
                  Balance: {VnDong.format(wallet.balance)}
                </Text>
              </>
            ) : (
              <Text className="text-gray-600">
                No wallet information available.
              </Text>
            )}
          </View>
        </View>

        {/* Deposit Section */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-800">Deposit</Text>
          <View className="mt-2 rounded-lg bg-white p-4 shadow-sm">
            <TextInput
              className="mt-2 rounded-lg border border-gray-300 p-3"
              placeholder="Enter deposit amount (VND)"
              keyboardType="numeric"
              value={depositAmount}
              onChangeText={setDepositAmount}
            />
            <TouchableOpacity
              className={`mt-4 rounded-lg p-3 ${
                depositLoading ? "bg-blue-300" : "bg-blue-500"
              }`}
              onPress={handleDeposit}
              disabled={depositLoading}
            >
              <Text className="text-center font-semibold text-white">
                {depositLoading ? "Processing..." : "Deposit"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Logout Button */}
      <View className="p-4">
        <CustomButton
          title="Logout"
          onPress={onLogout}
          className="rounded-md bg-red-500 py-3 text-lg font-semibold text-white"
        />
      </View>
    </SafeAreaView>
  );
}
