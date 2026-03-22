import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [locationStatus, setLocationStatus] = useState<
    "detecting" | "detected" | "denied"
  >("detecting");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus("detected");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => setLocationStatus("detected"),
      () => setLocationStatus("detected"),
      { timeout: 5000 },
    );
  }, []);

  const handleSearch = () => {
    onSearch(searchQuery);
    const el = document.getElementById("restaurants");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section
      className="relative min-h-[520px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('/assets/generated/hero-food-bg.dim_1440x600.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight"
        >
          Discover Best Food &amp; Drinks
          <span className="block text-orange-300">in Pochampalli</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white/80 text-lg mb-8"
        >
          Order from the best local restaurants, book tables, and explore food
          events
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-full shadow-2xl overflow-hidden max-w-3xl mx-auto"
        >
          {/* Location chip */}
          <div className="flex items-center gap-2 px-5 py-3 border-b sm:border-b-0 sm:border-r border-border min-w-[180px]">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <div className="text-left">
              {locationStatus === "detecting" ? (
                <>
                  <div className="text-xs text-muted-foreground animate-pulse">
                    Detecting location…
                  </div>
                  <div className="text-xs font-semibold text-foreground">
                    Finding you…
                  </div>
                </>
              ) : (
                <>
                  <div className="text-xs text-muted-foreground">
                    Your location
                  </div>
                  <div className="text-xs font-semibold text-foreground">
                    Pochampalli District
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Search input */}
          <div className="flex-1 flex items-center px-4">
            <Search className="w-4 h-4 text-muted-foreground mr-2 flex-shrink-0" />
            <Input
              type="text"
              placeholder="Search for restaurants, cuisines, dishes…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              data-ocid="hero.search_input"
              className="border-0 shadow-none focus-visible:ring-0 p-0 text-sm h-12"
            />
          </div>

          {/* CTA Button */}
          <div className="px-2 py-2">
            <Button
              onClick={handleSearch}
              data-ocid="hero.find_food_button"
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 h-10 w-full sm:w-auto font-semibold"
            >
              Find Food
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
