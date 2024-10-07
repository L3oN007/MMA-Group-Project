import axios, { AxiosError } from "axios";

import { IBlog } from "@/types/blog.type";

const blogService = {
  getAllBlogs: async () => {
    try {
      const { data } = await axios.get<IBlog[]>(
        "https://648867740e2469c038fda6cc.mockapi.io/api/v1/blogs"
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as IBackendErrorRes;
        throw new Error(
          `Error ${error.response?.status}: ${message || error.message}`
        );
      } else {
        throw new Error("An unexpected error occurred with get all blogs");
      }
    }
  },
  getBlogById: async (id: string) => {
    try {
      const { data } = await axios.get<IBlog>(
        `https://648867740e2469c038fda6cc.mockapi.io/api/v1/blogs/${id}`
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as IBackendErrorRes;
        throw new Error(
          `Error ${error.response?.status}: ${message || error.message}`
        );
      } else {
        throw new Error("An unexpected error occurred with get blog by id");
      }
    }
  },
};

export default blogService;

