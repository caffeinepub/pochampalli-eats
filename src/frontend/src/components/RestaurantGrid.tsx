import { Skeleton } from "@/components/ui/skeleton";
import type { Restaurant } from "../backend.d";
import { useToggleFavorite } from "../hooks/useQueries";
import { RestaurantCard } from "./RestaurantCard";

const SKELETON_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6"];

const FALLBACK_RESTAURANTS: Restaurant[] = [
  {
    id: 1n,
    name: "Pochampalli Biryani House",
    description:
      "Authentic dum biryani since 1985, slow-cooked with secret spices",
    area: "Pochampalli",
    cuisines: ["Biryani", "Telugu", "Mughlai"],
    rating: 4.7,
    deliveryTime: "35-45 min",
    priceForTwo: 450n,
    imageUrl: "/assets/generated/restaurant-biryani.dim_400x250.jpg",
  },
  {
    id: 2n,
    name: "Sree Annapoorna Meals",
    description: "Traditional Telugu thali with fresh homestyle cooking",
    area: "Nalgonda",
    cuisines: ["South Indian", "Telugu Meals", "Vegetarian"],
    rating: 4.5,
    deliveryTime: "25-35 min",
    priceForTwo: 280n,
    imageUrl: "/assets/generated/restaurant-meals.dim_400x250.jpg",
  },
  {
    id: 3n,
    name: "Gongura Garden",
    description: "Signature Gongura chicken and traditional Andhra specials",
    area: "Suryapet",
    cuisines: ["Andhra", "Non-Veg", "Gongura Specials"],
    rating: 4.6,
    deliveryTime: "40-50 min",
    priceForTwo: 520n,
    imageUrl: "/assets/generated/restaurant-gongura.dim_400x250.jpg",
  },
  {
    id: 4n,
    name: "Dosa Plaza",
    description: "Crispy dosas, uttapams and South Indian breakfast all day",
    area: "Pochampalli",
    cuisines: ["South Indian", "Breakfast", "Vegetarian"],
    rating: 4.3,
    deliveryTime: "20-30 min",
    priceForTwo: 220n,
    imageUrl: "/assets/generated/restaurant-dosa.dim_400x250.jpg",
  },
  {
    id: 5n,
    name: "Potharekulu Sweet House",
    description: "Famous handmade potharekulu and traditional Telugu sweets",
    area: "Pochampalli",
    cuisines: ["Sweets", "Snacks", "Traditional"],
    rating: 4.8,
    deliveryTime: "15-20 min",
    priceForTwo: 150n,
    imageUrl: "/assets/generated/restaurant-sweets.dim_400x250.jpg",
  },
  {
    id: 6n,
    name: "Crave Zone",
    description: "Burgers, wraps and modern fast food for the young crowd",
    area: "Nalgonda",
    cuisines: ["Fast Food", "Burgers", "Snacks"],
    rating: 4.1,
    deliveryTime: "25-40 min",
    priceForTwo: 350n,
    imageUrl: "/assets/generated/restaurant-fastfood.dim_400x250.jpg",
  },
];

interface RestaurantGridProps {
  restaurants?: Restaurant[];
  isLoading: boolean;
  searchQuery: string;
  activeFilters: { cuisine: string; rating: number; area: string };
}

export function RestaurantGrid({
  restaurants,
  isLoading,
  searchQuery,
  activeFilters,
}: RestaurantGridProps) {
  const toggleFav = useToggleFavorite();

  let displayList =
    restaurants && restaurants.length > 0 ? restaurants : FALLBACK_RESTAURANTS;

  if (!restaurants || restaurants.length === 0) {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      displayList = displayList.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisines.some((c) => c.toLowerCase().includes(q)) ||
          r.area.toLowerCase().includes(q),
      );
    }
    if (activeFilters.cuisine) {
      displayList = displayList.filter((r) =>
        r.cuisines.some((c) =>
          c.toLowerCase().includes(activeFilters.cuisine.toLowerCase()),
        ),
      );
    }
    if (activeFilters.rating > 0) {
      displayList = displayList.filter((r) => r.rating >= activeFilters.rating);
    }
    if (activeFilters.area) {
      displayList = displayList.filter(
        (r) => r.area.toLowerCase() === activeFilters.area.toLowerCase(),
      );
    }
  }

  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        data-ocid="restaurants.loading_state"
      >
        {SKELETON_KEYS.map((sk) => (
          <div
            key={sk}
            className="bg-card rounded-xl overflow-hidden shadow-sm"
          >
            <Skeleton className="w-full h-48" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (displayList.length === 0) {
    return (
      <div className="text-center py-16" data-ocid="restaurants.empty_state">
        <div className="text-5xl mb-4">🍽️</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No restaurants found
        </h3>
        <p className="text-muted-foreground">
          Try a different search or adjust your filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayList.map((restaurant, index) => (
        <RestaurantCard
          key={restaurant.id.toString()}
          restaurant={restaurant}
          index={index}
          onToggleFavorite={(id) => toggleFav.mutate(id)}
        />
      ))}
    </div>
  );
}
