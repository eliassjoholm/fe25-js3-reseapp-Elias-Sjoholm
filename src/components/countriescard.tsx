import { Link, useLocation } from "react-router";
import type { Countries } from "../types/country";

interface CountryCardProps {
  country: Countries;
}

export default function CountryCard({
  country,
}: CountryCardProps) {
  const location = useLocation();
  return (

        <Link
      to={`/country/${country.alpha3Code}`}
      state={{ from: location.search }}
      className="block h-full rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
    <article className="h-full w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-center justify-center rounded-md bg-gray-50 p-3">
        <img
          src={country.flags.svg}
          alt={`Flagga för ${country.name}`}
          className="h-12 w-20 object-contain"
        />
      </div>

      <h2 className="mb-2 text-base font-semibold">
        {country.name}
      </h2>

      <div className="space-y-1 text-sm text-gray-600">
        <p>
          <strong>Region:</strong> {country.region}
        </p>

        <p>
          <strong>Huvudstad:</strong>{" "}
          {country.capital || "Saknas"}
        </p>
      </div>
    </article>
        </Link>
  );
}