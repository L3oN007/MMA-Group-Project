import { AxiosError } from "axios";

import http from "@/lib/http";
import { IUser, UserRole } from "@/types/user.type";

const userService = {
  getCurrentUser: async (accessToken: string) => {
    try {
      const { data } = await http.get<IBackendRes<IUser>>(
        "api/v1/users/me",
        {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Example for Authorization header
              'Content-Type': 'application/json',
            },
        }
        );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as IBackendErrorRes;
        throw new Error(
          `Error ${error.response?.status}: ${message || error.message}`
        );
      } else {
        throw new Error(
          "An unexpected error occurred when get current user information"
        );
      }
    }
  },
  getUserTabsByRole: (role: string | undefined) => {
    switch (role) {
      case UserRole.STAFF:
      case UserRole.MANAGER:
      case UserRole.ADMIN:
        return tabs[role.toLocaleLowerCase() as keyof typeof tabs];
      default:
        return tabs.user;
    }
  }
};

const tabs = {
  user: "userTabs",
  staff: "staffTabs",
  manager: "managerTabs",
  admin: "adminTabs",
};

export { userService };

