import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="blog/[blogId]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
