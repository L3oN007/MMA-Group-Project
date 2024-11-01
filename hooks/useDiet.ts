import dietService from "@/services/diet.service";
import { useQuery } from "@tanstack/react-query";

/**
 * Fetches all diets from the backend.
 *
 * @returns A list of diets.
 */
const useDiet = () => {
  return useQuery({
    queryKey: ["diets"],
    queryFn: () => dietService.getAllDiets(),
    throwOnError: true,
  });
};

/**
 * Fetches a diet by its ID from the backend.
 *
 * @param id The ID of the diet to fetch.
 * @returns The diet data corresponding to the provided ID.
 */
const useDietById = (id: string) => {
  return useQuery({
    queryKey: ["diet", id],
    queryFn: () => dietService.getDietById(id),
    throwOnError: true,
  });
};

export { useDiet, useDietById };
