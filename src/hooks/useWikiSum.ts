import { useQuery } from "@tanstack/react-query";
import { getWikiSummary } from "../api/wiki";

export function useWikiSummary(countryName: string) {
  return useQuery({
    queryKey: ["wikipedia", countryName],
    queryFn: () => getWikiSummary(countryName),
    staleTime: 1000 * 50 * 50,
  });
}