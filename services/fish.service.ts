import { ErrorMessage } from '@hookform/error-message';
import axios, { AxiosError } from "axios";

import { IFish } from "@/types/fish.type";

const fishService = {
  /**
   * Get all fish
   * @returns A list of fish
   * @throws Error if the request fails
   */
  getAllFishes: async () => {
    try {
      const { data } = await axios.get<{ isSuccess: boolean; data: IFish[] }>(
        "https://koi-api.uydev.id.vn/api/v1/koi-fishes"
      );
      if (!data.isSuccess) {
        throw new Error("Failed to fetch fish data");
      }
  
      return data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("API Error:", error.response);
        const { message } = error.response?.data as IBackendErrorRes;
        throw new Error(`Error ${error.response?.status}: ${message || error.message}`);
      } else {
        console.error("Unexpected Error:", error);
        throw new Error("An unexpected error occurred with get all fish");
      }
    }
  },
  /**
   * Get a fish by its id
   * @param id The id of the fish to get
   * @returns The fish with the given id
   * @throws Error if the request fails
   */
  getFishById: async (id: string) => {
    try {
      const { data } = await axios.get<{ data: IFish; isSuccess: boolean; message: string }>(
        `https://koi-api.uydev.id.vn/api/v1/koi-fishes/${id}`
      );
      return data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as IBackendErrorRes;
        throw new Error(`Error ${error.response?.status}: ${message || error.message}`);
      } else {
        throw new Error("An unexpected error occurred with get fish by id");
      }
    }
  },

  deleteFishById: async(fishId: number, accessToken: string) => {
    return axios.delete(
      `https://koi-api.uydev.id.vn/api/v1/koi-fishes/${fishId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Example for Authorization header
          'Content-Type': 'application/json',
        },
    }
    )
      .then((res) => res)
      .catch((err: any) => {
        console.error('Failed to delete fish: status ', err.status, "message: ", err.message);
        return null;
      })
  },
};

export default fishService;