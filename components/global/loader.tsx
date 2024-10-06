import { ActivityIndicator, Dimensions, Platform, View } from "react-native";

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  const osName = Platform.OS;
  const screenHeight = Dimensions.get("screen").height;

  if (!isLoading) return null;

  return (
    <View
      className="absolute z-10 flex h-full w-full items-center justify-center bg-primary/50"
      style={{
        height: screenHeight,
      }}
    >
      <ActivityIndicator
        animating={isLoading}
        color="#FFA000"
        size={osName === "ios" ? "large" : 50}
      />
    </View>
  );
};

export default Loader;
