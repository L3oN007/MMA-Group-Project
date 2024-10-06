
import useAuthStore from "@/stores/useAuthStore";
import { Redirect } from "expo-router";

const Page = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) return <Redirect href="/(root)/(tabs)/home" />;

  return <Redirect href="/(auth)/welcome" />;
};

export default Page;