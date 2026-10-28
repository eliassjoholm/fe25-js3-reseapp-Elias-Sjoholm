// hook: alla länder (startsidan)
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../api/countriesapi";

// hämtar listan en gång och sparar den
export function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    staleTime: 1000 * 55 * 55, // länderna ändras typ aldrig
  });
}