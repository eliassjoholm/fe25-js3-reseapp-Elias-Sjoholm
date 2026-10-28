// startsidan med alla länder
import { useSearchParams } from "react-router";
import CountryCard from "../components/countriescard";
import SearchField from "../components/searchfield";
import { useCountries } from "../hooks/usecountrieshook";
import RegionFilter from "../components/regionfilters";
import Pagination from "../components/pagenation";
    
const PAGE_SIZE = 12; // länder per sida
// lista med sök, regionfilter och sidor
export default function HomePage() {
  const {
    data: countries,
    isPending,
    isError,
    refetch,
  } = useCountries();

  // sök, region och sida ligger i url:en
  const [searchParams, setSearchParams] = useSearchParams();
  const region = searchParams.get("region") ?? "All";
  const query = searchParams.get("query") ?? "";

   const pageParam = Number(searchParams.get("page"));
  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  // ändrar en sak i url:en, tar bort den om den är tom
  function updateParam(key: string, value: string) {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);

        if (value && value !== "All") {
          next.set(key, value);
        } else {
          next.delete(key);
        }

        // nytt filter -> tillbaka till sida 1
        if (key !== "page") {
          next.delete("page");
        }

        return next;
      },
      { replace: key === "query" } // inte en history-rad per bokstav
    );
  }

  // när man skriver i sökfältet
  function handleSearch(value: string) {
    updateParam("query", value);
  }

  // när man väljer region
  function handleRegion(value: string) {
    updateParam("region", value);
  

  }

  // byter sida och scrollar upp
   function handlePage(newPage: number) {
    updateParam("page", newPage > 1 ? String(newPage) : "");
    window.scrollTo(0, 0);
  }

  if (isPending) {
    return (
      <main className="p-8">
        <div role="status" className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-6 w-6 animate-spin rounded-full border-4 border-indigo-400 border-t-transparent"
          />
          <span>Laddar länder...</span>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="p-8">
        <p role="alert" className="mb-4 text-red-400">
          Kunde inte hämta länder.
        </p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="rounded-lg bg-indigo-400 px-4 py-2 text-indigo-950 hover:bg-indigo-300 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Försök igen
        </button>
      </main>
    );
  }

  // filtrera på namn + region
   const filteredCountries = countries.filter((country) => {
    const matchesQuery = country.name
      .toLowerCase()
      .includes(query.trim().toLowerCase());
    const matchesRegion = region === "All" || country.region === region;

    return matchesQuery && matchesRegion;
  });

  // plocka ut länderna för just den här sidan
  const totalPages = Math.max(1, Math.ceil(filteredCountries.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageCountries = filteredCountries.slice(start, start + PAGE_SIZE);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">
        Utforska världen
      </h1>

      <p className="mb-8 text-slate-400">
        Upptäck världens {countries.length} länder
      </p>

      <SearchField value={query} onChange={handleSearch} />

      <RegionFilter selected={region} onSelect={handleRegion} />

      {filteredCountries.length === 0 ? (
        <p className="text-slate-400">
          Inga länder matchar dina kriterier
        </p>
      ) : (
        <>
          <ul className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pageCountries.map((country) => (
              <li
                key={country.alpha3Code}
                className="w-full max-w-[260px]"
              >
                <CountryCard country={country} />
              </li>
            ))}
          </ul>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePage}
          />
        </>
      )}
    </main>
  );
}