import axios, { AxiosError } from "axios";

import { IDiet } from "@/types/diet.type";

const dietService = {
  /**
   * Get all diets
   * @returns A list of diets
   * @throws Error if the request fails
   */
  getAllDiets: async () => {
    try {
      const { data } = await axios.get<{ isSuccess: boolean; data: IDiet[] }>(
        "https://koi-api.uydev.id.vn/api/v1/diets"
      );
      if (!data.isSuccess) {
        throw new Error("Failed to fetch diet data");
      }

      return data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("API Error:", error.response);
        const { message } = error.response?.data as IBackendErrorRes;
        throw new Error(
          `Error ${error.response?.status}: ${message || error.message}`
        );
      } else {
        console.error("Unexpected Error:", error);
        throw new Error("An unexpected error occurred with get all diets");
      }
    }
  },

  /**
   * Get a diet by its id
   * @param id The id of the diet to get
   * @returns The diet with the given id
   * @throws Error if the request fails
   */
  getDietById: async (id: string) => {
    try {
      const { data } = await axios.get<{
        data: IDiet;
        isSuccess: boolean;
        message: string;
      }>(`https://koi-api.uydev.id.vn/api/v1/diets/${id}`);
      if (!data.isSuccess) {
        throw new Error("Failed to fetch diet data by id");
      }

      return data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as IBackendErrorRes;
        throw new Error(
          `Error ${error.response?.status}: ${message || error.message}`
        );
      } else {
        throw new Error("An unexpected error occurred with get diet by id");
      }
    }
  },
};

export default dietService;
