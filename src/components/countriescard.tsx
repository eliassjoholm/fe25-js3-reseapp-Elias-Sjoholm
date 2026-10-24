import type { Countries } from "../types/country";

interface CountryCardProps {
  country: Countries;
}

export default function CountryCard({
  country,
}: CountryCardProps) {
  return (
    <article className="flex h-full items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <img
        src={country.flags.svg}
        alt={`Flagga för ${country.name}`}
        className="h-12 w-16 shrink-0 object-contain"
      />

      <div className="min-w-0">
        <h2 className="font-semibold">
          {country.name}
        </h2>

        <p className="text-sm text-gray-500">
          {country.region}
        </p>

        <p className="text-sm text-gray-500">
          {country.capital || "Saknas"}
        </p>
      </div>
    </article>
  );
}