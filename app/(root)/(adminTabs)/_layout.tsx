import React from "react";

import { Image, Text, View } from "react-native";

import icons from "@/constants/Icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AdminLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#fc0200",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 0.2,
            borderTopColor: "#CDCDE0",
            height: 84,
          },
        }}
      >
        {/* <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={
                  <FontAwesome name="user-circle" size={24} color={color} />
                }
                color={color}
                name="Profile"
                focused={focused}
                isExpoIcon={true}
              />
            ),
          }}
        /> */}
      </Tabs>

      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
};

export default AdminLayout;
