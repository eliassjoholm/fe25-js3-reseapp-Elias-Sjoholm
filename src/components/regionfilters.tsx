// knappar för att filtrera på region
// "All" = visa alla
const REGIONS = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

interface RegionFilterProps {
  selected: string;
  onSelect: (region: string) => void;
}

// en knapp per region, den valda markeras
export default function RegionFilter({
  selected,
  onSelect,
}: RegionFilterProps) {
  return (
    <div className="mb-6">
      <p id="region-label" className="mb-1 text-sm font-medium">
        Region
      </p>

      <div
        role="group"
        aria-labelledby="region-label"
        className="flex flex-wrap gap-2"
      >
        {REGIONS.map((region) => {
          const isSelected = region === selected;

          return (
            <button
              key={region}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(region)}
              className={`rounded-full border px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 ${
                isSelected
                  ? "border-indigo-400 bg-indigo-400 text-indigo-950"
                  : "border-slate-600 bg-slate-800 text-slate-200 hover:bg-slate-700"
              }`}
            >
              {region}
            </button>
          );
        })}
      </div>
    </div>
  );
}