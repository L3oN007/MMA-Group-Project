import blogService from "@/services/blog.service";
import { useQuery } from "@tanstack/react-query";

const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: () => blogService.getAllBlogs(),
  });
};

const useBlogById = (id: string) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => blogService.getBlogById(id),
  });
};

export { useBlogs, useBlogById };

