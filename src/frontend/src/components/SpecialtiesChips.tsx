const specialties = [
  "Pochampalli Biryani",
  "Potharekulu",
  "Telugu Meals",
  "Pesarattu",
  "Gongura Chicken",
  "Royyala Iguru",
];

interface SpecialtiesChipsProps {
  onSearch: (query: string) => void;
}

export function SpecialtiesChips({ onSearch }: SpecialtiesChipsProps) {
  return (
    <div
      className="flex flex-wrap items-center gap-3 mb-8"
      data-ocid="specialties.section"
    >
      <span className="text-sm font-semibold text-foreground">
        Popular Local Specialties:
      </span>
      {specialties.map((s) => (
        <button
          type="button"
          key={s}
          onClick={() => onSearch(s)}
          data-ocid="specialties.toggle"
          className="px-4 py-1.5 rounded-full text-xs font-medium bg-orange-50 text-primary border border-orange-200 hover:bg-primary hover:text-white transition-all cursor-pointer"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
