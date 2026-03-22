interface ActiveFilters {
  cuisine: string;
  rating: number;
  area: string;
}

interface FilterRowProps {
  activeFilters: ActiveFilters;
  onFilterChange: (filters: ActiveFilters) => void;
}

const cuisineOptions = ["South Indian", "Biryani", "Telugu Meals", "Fast Food"];
const ratingOptions = [
  { label: "4.0+", value: 4.0 },
  { label: "3.5+", value: 3.5 },
];
const areaOptions = ["Pochampalli", "Nalgonda", "Suryapet"];

export function FilterRow({ activeFilters, onFilterChange }: FilterRowProps) {
  const toggle = <T extends string | number>(
    key: keyof ActiveFilters,
    value: T,
    empty: T,
  ) => {
    onFilterChange({
      ...activeFilters,
      [key]: activeFilters[key] === value ? empty : value,
    });
  };

  const chipClass = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
      active
        ? "bg-primary text-white border-primary"
        : "bg-white text-foreground border-border hover:border-primary hover:text-primary"
    }`;

  return (
    <div className="mb-6" data-ocid="filter.section">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-foreground">
          Filter By:
        </span>

        {cuisineOptions.map((c) => (
          <button
            type="button"
            key={c}
            onClick={() => toggle("cuisine", c, "")}
            data-ocid="filter.cuisine.toggle"
            className={chipClass(activeFilters.cuisine === c)}
          >
            {c}
          </button>
        ))}

        {ratingOptions.map((r) => (
          <button
            type="button"
            key={r.label}
            onClick={() => toggle("rating", r.value, 0)}
            data-ocid="filter.rating.toggle"
            className={chipClass(activeFilters.rating === r.value)}
          >
            ⭐ {r.label}
          </button>
        ))}

        {areaOptions.map((a) => (
          <button
            type="button"
            key={a}
            onClick={() => toggle("area", a, "")}
            data-ocid="filter.area.toggle"
            className={chipClass(activeFilters.area === a)}
          >
            📍 {a}
          </button>
        ))}
      </div>
    </div>
  );
}
