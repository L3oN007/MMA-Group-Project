// services/users.service.ts
import { AxiosError } from "axios";

import { IUser, UserRole } from "@/types/user.type";

import http from "@/lib/http";

const userService = {
  getCurrentUser: async (accessToken: string) => {
    try {
      const { data } = await http.get<IBackendRes<IUser>>("api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as IBackendErrorRes;
        throw new Error(
          `Error ${error.response?.status}: ${message || error.message}`
        );
      } else {
        throw new Error(
          "An unexpected error occurred when getting user information"
        );
      }
    }
  },

  getUserWallet: async (accessToken: string) => {
    try {
      const { data } = await http.get("api/v1/users/me/wallets", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as IBackendErrorRes;
        throw new Error(
          `Error ${error.response?.status}: ${message || error.message}`
        );
      } else {
        throw new Error(
          "An unexpected error occurred while retrieving wallet information"
        );
      }
    }
  },

  deposit: async (accessToken: string, amount: number) => {
    try {
      const { data } = await http.post(
        `api/v1/wallets/deposit?amount=${amount}&paymentMethod=VNPAY`, // sending amount as query param
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data;
        throw new Error(
          `Error ${error.response?.status}: ${message || error.message}`
        );
      } else {
        throw new Error(
          "An unexpected error occurred while processing the deposit"
        );
      }
    }
  },

  getUserTabsByRole: (role: string | undefined) => {
    switch (role) {
      case UserRole.STAFF:
      case UserRole.MANAGER:
      case UserRole.ADMIN:
        return tabs[role.toLowerCase() as keyof typeof tabs];
      default:
        return tabs.user;
    }
  },
};

const tabs = {
  user: "userTabs",
  staff: "staffTabs",
  manager: "managerTabs",
  admin: "adminTabs",
};

export { userService };
