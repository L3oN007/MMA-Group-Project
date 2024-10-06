import { AxiosError } from "axios";

import { ILoginRes } from "@/types/auth.type";

import http from "@/lib/http";

const authService = {
  login: async (email: string, password: string) => {
    try {
      const { data } = await http.post<IBackendRes<ILoginRes>>(
        "api/v1/users/login",
        {
          email,
          password,
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
        throw new Error("An unexpected error occurred with login");
      }
    }
  },
  register: async (
    email: string,
    password: string,
    fullName: string,
    dob: string,
    phoneNumber: string,
    imageUrl: string,
    address: string
  ) => {
    try {
      const { data } = await http.post("api/v1/users/register", {
        email,
        password,
        fullName,
        dob,
        phoneNumber,
        imageUrl,
        address,
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as IBackendErrorRes;
        throw new Error(
          `Error ${error.response?.status}: ${message || error.message}`
        );
      } else {
        throw new Error("An unexpected error occurred with register");
      }
    }
  },
};

export default authService;

