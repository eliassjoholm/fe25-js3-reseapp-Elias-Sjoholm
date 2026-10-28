import { useQuery } from "@tanstack/react-query";
import { getWeather } from "../api/weather";
import type { CountryDetails } from "../types/country";

export function useWeather(country: CountryDetails) {
  return useQuery({
    queryKey: ["weather", country.alpha3Code],
    queryFn: () => getWeather(country),
    staleTime: 1000 * 60 * 10,
  });
}