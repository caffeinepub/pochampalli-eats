import { Clock, Heart, MapPin, Star, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Restaurant } from "../backend.d";

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
  onToggleFavorite: (id: bigint) => void;
  isFavorite?: boolean;
}

export function RestaurantCard({
  restaurant,
  index,
  onToggleFavorite,
  isFavorite = false,
}: RestaurantCardProps) {
  const [favLocal, setFavLocal] = useState(isFavorite);

  const imageUrl = restaurant.imageUrl
    ? restaurant.imageUrl
    : `https://picsum.photos/seed/${encodeURIComponent(restaurant.name)}/400/250`;

  const handleFav = () => {
    setFavLocal(!favLocal);
    onToggleFavorite(restaurant.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1 }}
      className="bg-card rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
      data-ocid={`restaurants.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={restaurant.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://picsum.photos/seed/${restaurant.id}/400/250`;
          }}
        />
        <button
          type="button"
          onClick={handleFav}
          data-ocid={`restaurants.toggle.${index + 1}`}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${favLocal ? "fill-red-500 text-red-500" : "text-gray-400"}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-bold text-base text-foreground leading-tight flex-1 pr-2">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1 bg-rating text-white rounded-md px-2 py-0.5 flex-shrink-0">
            <Star className="w-3 h-3 fill-white" />
            <span className="text-xs font-bold">
              {restaurant.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground text-xs mb-2">
          <MapPin className="w-3 h-3" />
          <span>{restaurant.area}</span>
        </div>

        {/* Cuisine tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {restaurant.cuisines.slice(0, 3).map((cuisine) => (
            <span
              key={cuisine}
              className="text-xs px-2 py-0.5 bg-orange-50 text-primary rounded-full border border-orange-100"
            >
              {cuisine}
            </span>
          ))}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>₹{restaurant.priceForTwo.toString()} for two</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
