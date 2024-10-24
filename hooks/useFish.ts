import fishService from "@/services/fish.service";
import { useQuery } from "@tanstack/react-query";

/**
 * Fetches all fish from the backend.
 *
 * @returns A list of fish.
 */

const useFish = () => {
  return useQuery({
    queryKey: ["fish"],
    queryFn: () => fishService.getAllFishes(),
  });
};

/**
 * Fetches a fish by its ID from the backend.
 *
 * @param id The ID of the fish to fetch.
 * @returns The fish data corresponding to the provided ID.
 */
const useFishById = (id: string) => {
  return useQuery({
    queryKey: ["fish", id],
    queryFn: () => fishService.getFishById(id),
  });
};

export { useFish, useFishById };