import { useUsers } from "@/hooks/userUsers";
import useAuthStore from "@/stores/useAuthStore";
import { UserRole } from "@/types/user.type";
import { Stack } from "expo-router";
import { useEffect } from "react";

const Layout = () => {
  const { mutateAsync: getUserInfo, isPending: isGetting } = useUsers();
  const { user } = useAuthStore();

  useEffect(() => {
    // Init user info
    getUserInfo();
  }, []);

  const onGetTabByRole = (role: string | undefined) => {
    switch (role) {
      case UserRole.STAFF:
      case UserRole.MANAGER:
      case UserRole.ADMIN:
        return tabs[role.toLocaleLowerCase() as keyof typeof tabs];
      default:
        return tabs.user;
    }
  }
  return (
    <Stack>
      <Stack.Screen name={`(adminTabs)`} options={{ headerShown: false }} />
      <Stack.Screen name="blog/[blogId]" options={{ headerShown: false }} />
    </Stack>
  );
};

const tabs = {
  user: 'userTabs',
  staff: 'staffTabs',
  manager: 'managerTabs',
  admin: 'adminTabs',
}

export default Layout;
