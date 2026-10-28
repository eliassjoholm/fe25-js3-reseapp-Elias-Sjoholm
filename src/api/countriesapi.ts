import type { Countries, CountryDetails } from "../types/country";

const API_URL =
  "https://countries.dev/countries?fields=name,alpha3Code,region,capital,flags,population,area";

export async function getCountries(): Promise<Countries[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Kunde inte hämta länder");
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Ogiltigt svar från API:et");
  }

  return data as Countries[];
}

export async function getCountry(
  code: string
): Promise<CountryDetails | null> {
  const response = await fetch(
    `https://countries.dev/alpha/${encodeURIComponent(code)}`
  );

  
  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Kunde inte hämta landet");
  }

  return (await response.json()) as CountryDetails;
}