import { AxiosError } from "axios";

import http from "@/lib/http";
import { IUser } from "@/types/user.type";

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
};

export { userService };

