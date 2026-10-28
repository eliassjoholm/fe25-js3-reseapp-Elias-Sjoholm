// väderrutan på landets sida
import { useWeather } from "../hooks/useweather";
import type { CountryDetails } from "../types/country";
import { describeWeather } from "../utils/describeWeather";

interface WeatherCardProps {
  country: CountryDetails;
}

// visar laddning, fel eller vädret
export default function WeatherCard({ country }: WeatherCardProps) {
  const { data: weather, isPending, isError, refetch } = useWeather(country);
  // väderkod -> text + ikon
  const description = weather ? describeWeather(weather.weatherCode) : null;

  return (
    <section
      aria-labelledby="weather-heading"
      className="mt-6 rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-sm"
    >
      <h2 id="weather-heading" className="mb-4 text-xl font-semibold">
        Väder just nu{weather ? ` i ${weather.place}` : ""}
      </h2>

      {isPending && <p role="status">Laddar väder...</p>}

      {isError && (
        <div>
          <p role="alert" className="mb-3 text-red-400">
            Kunde inte hämta vädret.
          </p>

          <button
            type="button"
            onClick={() => void refetch()}
            className="rounded-lg bg-indigo-400 px-4 py-2 text-indigo-950 hover:bg-indigo-300 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Försök igen
          </button>
        </div>
      )}

      {weather === null && <p>Det finns ingen plats att hämta väder för.</p>}

      {weather && description && (
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="text-5xl">
            {description.icon}
          </span>

          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            <dt className="font-semibold">Väder</dt>
            <dd>{description.text}</dd>

            <dt className="font-semibold">Temperatur</dt>
            <dd>{weather.temperature.toLocaleString("sv-SE")} °C</dd>

            <dt className="font-semibold">Vind</dt>
            <dd>{weather.windSpeed.toLocaleString("sv-SE")} m/s</dd>
          </dl>
        </div>
      )}
    </section>
  );
}