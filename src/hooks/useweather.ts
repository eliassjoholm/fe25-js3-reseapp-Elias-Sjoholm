// hook: väder
import { useQuery } from "@tanstack/react-query";
import { getWeather } from "../api/weather";
import type { CountryDetails } from "../types/country";

// hämtar vädret, cachas per land
export function useWeather(country: CountryDetails) {
  return useQuery({
    queryKey: ["weather", country.alpha3Code],
    queryFn: () => getWeather(country),
    staleTime: 1000 * 60 * 10, // 10 min, vädret ändras ju
  });
}