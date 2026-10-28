// hook: ett land (detaljsidan)
import { useQuery } from "@tanstack/react-query";
import { getCountry } from "../api/countriesapi";

// hämtar landet, cachas per landskod
export function useCountry(code: string) {
  return useQuery({
    queryKey: ["country", code],
    queryFn: () => getCountry(code),
    staleTime: 1000 * 60 * 60, // en timme
  });
}