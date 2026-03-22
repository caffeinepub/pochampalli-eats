import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Restaurant } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllRestaurants() {
  const { actor, isFetching } = useActor();
  return useQuery<Restaurant[]>({
    queryKey: ["restaurants"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRestaurants();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchRestaurants(searchText: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Restaurant[]>({
    queryKey: ["restaurants", "search", searchText],
    queryFn: async () => {
      if (!actor) return [];
      if (!searchText.trim()) return actor.getAllRestaurants();
      return actor.searchRestaurants(searchText);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFilterRestaurants(area: string, minRating: number) {
  const { actor, isFetching } = useActor();
  return useQuery<Restaurant[]>({
    queryKey: ["restaurants", "filter", area, minRating],
    queryFn: async () => {
      if (!actor) return [];
      return actor.filterRestaurants(area, minRating);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetFavorites() {
  const { actor, isFetching } = useActor();
  return useQuery<Restaurant[]>({
    queryKey: ["favorites"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFavoriteRestaurants();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useToggleFavorite() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (restaurantId: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.toggleFavorite(restaurantId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}
