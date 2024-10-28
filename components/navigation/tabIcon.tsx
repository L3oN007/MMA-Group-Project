import { Image, Text, View } from "react-native";

export const TabIcon = ({
    icon,
    color,
    name,
    focused,
    isExpoIcon = false,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    color: string;
    name: string;
    focused: boolean;
    isExpoIcon?: boolean;
  }) => {
    return (
      <View className="flex items-center justify-center gap-1">
        {isExpoIcon ? (
          icon
        ) : (
          <Image
            source={icon}
            resizeMode="contain"
            tintColor={color}
            className="h-5 w-5"
          />
        )}
        <Text
          className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
          style={{ color: color }}
        >
          {name}
        </Text>
      </View>
    );
  };