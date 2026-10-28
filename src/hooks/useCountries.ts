import { useQuery } from "@tanstack/react-query";
import { getCountry } from "../api/countriesapi";

export function useCountry(code: string) {
  return useQuery({
    queryKey: ["country", code],
    queryFn: () => getCountry(code),
    staleTime: 1000 * 60 * 60,
  });
}