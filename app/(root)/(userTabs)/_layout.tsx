import React from "react";

import icons from "@/constants/Icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { TabIcon } from "@/components/navigation/tabIcon";

const TabLayout = () => {
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
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="blogs"
          options={{
            title: "Blogs",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={
                  <MaterialCommunityIcons
                    name="newspaper-variant"
                    size={24}
                    color={color}
                  />
                }
                color={color}
                name="Blogs"
                focused={focused}
                isExpoIcon={true}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={
                  <FontAwesome name="shopping-cart" size={24} color={color} />
                }
                color={color}
                name="Cart"
                focused={focused}
                isExpoIcon={true}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile_"
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
        />
      </Tabs>

      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
};

export default TabLayout;
