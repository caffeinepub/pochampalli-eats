import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { FilterRow } from "./components/FilterRow";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { RestaurantGrid } from "./components/RestaurantGrid";
import { ServicesStrip } from "./components/ServicesStrip";
import { SpecialtiesChips } from "./components/SpecialtiesChips";
import { useSearchRestaurants } from "./hooks/useQueries";

const queryClient = new QueryClient();

function AppContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    cuisine: "",
    rating: 0,
    area: "",
  });

  const { data: restaurants, isLoading } = useSearchRestaurants(activeQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <HeroSection onSearch={handleSearch} />
        <ServicesStrip />

        {/* Restaurants section */}
        <section id="restaurants" className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2
                className="text-2xl font-bold text-foreground"
                data-ocid="restaurants.section"
              >
                {activeQuery
                  ? `Results for "${activeQuery}"`
                  : "Top-Rated Restaurants in Pochampalli District"}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                {activeQuery ? "" : "Handpicked local favourites just for you"}
              </p>
            </div>

            <FilterRow
              activeFilters={activeFilters}
              onFilterChange={setActiveFilters}
            />
            <SpecialtiesChips onSearch={handleSearch} />

            <RestaurantGrid
              restaurants={restaurants}
              isLoading={isLoading}
              searchQuery={searchQuery}
              activeFilters={activeFilters}
            />
          </div>
        </section>
      </main>

      <Footer />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
