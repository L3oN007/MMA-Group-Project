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

    try {
      router.navigate(`/(${tabsRole})/profile_`);
    } catch(err) {}
  }, [user]);


  return (
    <Stack>
      <Stack.Screen name='(userTabs)' options={{ headerShown: false }} />
      <Stack.Screen name='(staffTabs)' options={{ headerShown: false }} />
      <Stack.Screen name='(managerTabs)' options={{ headerShown: false }} />
      <Stack.Screen name='(adminTabs)' options={{ headerShown: false }} />
      <Stack.Screen name="blog/[blogId]" options={{ headerShown: false }} />
      <Stack.Screen name="fishInput/[fishId]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
