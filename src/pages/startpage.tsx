import { useSearchParams } from "react-router";
import CountryCard from "../components/countriescard";
import SearchField from "../components/searchfield";
import { useCountries } from "../hooks/usecountrieshook";
import RegionFilter from "../components/regionfilters";

export default function HomePage() {
  const {
    data: countries,
    isPending,
    isError,
    refetch,
  } = useCountries();

  const [searchParams, setSearchParams] = useSearchParams();
  const region = searchParams.get("region") ?? "All";
  const query = searchParams.get("query") ?? "";

  function updateParam(key: string, value: string) {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);

        if (value && value !== "All") {
          next.set(key, value);
        } else {
          next.delete(key);
        }

        return next;
      },
      { replace: key === "query" }
    );
  }

  function handleSearch(value: string) {
    updateParam("query", value);
  }

  function handleRegion(value: string) {
    updateParam("region", value);
  

  }

  if (isPending) {
    return (
      <main className="p-8">
        <div role="status" className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-6 w-6 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"
          />
          <span>Laddar länder...</span>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="p-8">
        <p role="alert" className="mb-4 text-red-600">
          Kunde inte hämta länder.
        </p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Försök igen
        </button>
      </main>
    );
  }

   const filteredCountries = countries.filter((country) => {
    const matchesQuery = country.name
      .toLowerCase()
      .includes(query.trim().toLowerCase());
    const matchesRegion = region === "All" || country.region === region;

    return matchesQuery && matchesRegion;
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">
        Utforska världen
      </h1>

      <p className="mb-8 text-gray-600">
        Upptäck världens {countries.length} länder
      </p>

      <SearchField value={query} onChange={handleSearch} />

      <RegionFilter selected={region} onSelect={handleRegion} />

      {filteredCountries.length === 0 ? (
        <p className="text-gray-600">
          Inga länder matchar dina kriterier
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCountries.map((country) => (
            <li key={country.alpha3Code}>
              <CountryCard country={country} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}