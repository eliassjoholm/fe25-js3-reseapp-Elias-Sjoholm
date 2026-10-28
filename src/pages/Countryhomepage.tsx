// detaljsidan för ett land
import { Link, useLocation, useParams } from "react-router";
import { useCountry } from "../hooks/useCountries";
import WeatherCard from "../components/weatherCard";
import WikiIntro from "../components/wikintro";

const numberFormatter = new Intl.NumberFormat("sv-SE");

// hämtar landet från url:en och visar fakta, väder och wiki
export default function CountryPage() {
  const { code = "" } = useParams();
  const location = useLocation();
  const {
    data: country,
    isPending,
    isError,
    refetch,
  } = useCountry(code.toUpperCase());

  // Landkortet skickar med listans sök, filter och sida
  const state = location.state as { from?: string } | null;
  const backLink = `/${state?.from ?? ""}`;

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div role="status" className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-6 w-6 animate-spin rounded-full border-4 border-indigo-400 border-t-transparent"
          />
          <span>Laddar land...</span>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-8">
        <p role="alert" className="mb-4 text-red-400">
          Kunde inte hämta landet.
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

  if (country === null) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-4 text-3xl font-bold">Landet hittades inte</h1>

        <Link
          to={backLink}
          className="text-indigo-300 underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        >
          Tillbaka till alla länder
        </Link>
      </main>
    );
  }

  // listor -> vanlig text
  const languages =
    country.languages?.map((language) => language.name).join(", ") ||
    "Saknas";
  const currencies =
    country.currencies
      ?.map((currency) => `${currency.name} (${currency.code})`)
      .join(", ") || "Saknas";

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Link
        to={backLink}
        className="mb-6 inline-block rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
      >
        <span aria-hidden="true">← </span>Tillbaka
      </Link>

      <article className="rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <img
            src={country.flags.svg}
            alt={`Flagga för ${country.name}`}
            className="w-full max-w-60 rounded border border-slate-700"
          />

          <div>
            <h1 className="text-3xl font-bold">{country.name}</h1>

            {country.nativeName && (
              <p className="mb-4 text-lg text-slate-400">
                {country.nativeName}
              </p>
            )}

            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
              <dt className="font-semibold">Region</dt>
              <dd>
                {country.region}
                {country.subregion ? ` / ${country.subregion}` : ""}
              </dd>

              <dt className="font-semibold">Huvudstad</dt>
              <dd>{country.capital || "Saknas"}</dd>

              <dt className="font-semibold">Befolkning</dt>
              <dd>{numberFormatter.format(country.population)}</dd>

              <dt className="font-semibold">Språk</dt>
              <dd>{languages}</dd>

              <dt className="font-semibold">Valuta</dt>
              <dd>{currencies}</dd>
            </dl>
          </div>
        </div>
      </article>
        <WeatherCard country={country} />
      <WikiIntro countryName={country.name} />
    </main>
  );
}