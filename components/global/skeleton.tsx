import React, { useEffect, useRef } from "react";

import { Animated, Easing, StyleSheet, View, ViewStyle } from "react-native";

// Import Easing here
import { styled } from "nativewind";

export interface ISkeletonProps extends React.ComponentProps<typeof View> {
  variant?: "rounded" | "sharp" | "circular";
  speed?: 1 | 2 | 3 | 4;
  isLoading?: boolean;
  color?: string;
  className?: string;
}

const NativeWindView = styled(View);

const Skeleton: React.FC<ISkeletonProps> = ({
  variant = "rounded",
  speed = 2,
  isLoading = true,
  color = "#f4f4f5",
  className = "",
  style,
  ...rest
}) => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: speed * 800, // Adjust duration for smoother effect
          easing: Easing.inOut(Easing.ease), // Use Easing from react-native
          useNativeDriver: true,
        })
      ).start();
    }
  }, [isLoading, speed]);

  const translateX = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-600, 600], // Increased range for smoother shimmer movement
  });

  const variantStyle: ViewStyle = (() => {
    switch (variant) {
      case "circular":
        return { borderRadius: 9999 };
      case "sharp":
        return { borderRadius: 0 };
      default:
        return { borderRadius: 8 };
    }
  })();

  if (!isLoading) return null;

  return (
    <NativeWindView
      className={`relative overflow-hidden bg-gray-200 ${className}`}
      style={[variantStyle, style]}
      {...rest}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{ translateX }],
            backgroundColor: color,
            opacity: 0.3,
          },
        ]}
      />
    </NativeWindView>
  );
};

export default Skeleton;

