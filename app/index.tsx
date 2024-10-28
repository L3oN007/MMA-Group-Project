import useAuthStore from "@/stores/useAuthStore";
import { Redirect } from "expo-router";

import { UserRole } from "@/types/user.type";

const Page = () => {
  const { isAuthenticated, user } = useAuthStore();
  const userRole = user?.roleName;

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/welcome" />;
  }

  let redirectPath: string;

  switch (userRole) {
    case UserRole.ADMIN:
      redirectPath = "/(root)/(adminTabs)";
      break;
    case UserRole.MANAGER:
      redirectPath = "/(root)/(managerTabs)";
      break;
    case UserRole.STAFF:
      redirectPath = "/(root)/(staffTabs)";
      break;
    case UserRole.USER:
    default:
      redirectPath = "/(root)/(userTabs)/home";
      break;
  }

  return (
    <Redirect
      // FIXME: redirect base on role
      href={"/(root)/(userTabs)/home"}
    />
  );
};

export default Page;
