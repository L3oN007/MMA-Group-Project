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
      const { data } = await axios.get<IFish[]>(
        "api/v1/koi-fishes"
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as IBackendErrorRes;
        throw new Error(
          `Error ${error.response?.status}: ${message || error.message}`
        );
      } else {
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
      const { data } = await axios.get<IFish>(
        `api/v1/koi-fishes/${id}`
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as IBackendErrorRes; 
        throw new Error(
          `Error ${error.response?.status}: ${message || error.message}`
        );
      } else {
        throw new Error("An unexpected error occurred with get fish by id");
      }
    }
  },
};

export default fishService;