import { useEffect } from "react";

import useAuthStore from "@/stores/useAuthStore";
import { Stack, router } from "expo-router";
import { useUsers } from "@/hooks/useUser";
import { userService } from "@/services/users.service";

const Layout = () => {
  const { mutateAsync: getUserInfo, isPending: isGetting } = useUsers();
  const { user } = useAuthStore();

  useEffect(() => {
    // Init user info
    getUserInfo();
  }, []);

  useEffect(() => {
    if (!user) return;
    const tabsRole = userService.getUserTabsByRole(user?.roleName);
    router.navigate(`/(${tabsRole})/profile_`);
  }, [user]);


  return (
    <Stack>
      <Stack.Screen name='(userTabs)' options={{ headerShown: false }} />
      <Stack.Screen name='(staffTabs)' options={{ headerShown: false }} />
      <Stack.Screen name='(managerTabs)' options={{ headerShown: false }} />
      <Stack.Screen name='(adminTabs)' options={{ headerShown: false }} />
      <Stack.Screen name="blog/[blogId]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
