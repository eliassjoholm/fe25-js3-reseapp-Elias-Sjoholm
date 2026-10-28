// anrop mot countries.dev
import type { Countries, CountryDetails } from "../types/country";

// hämtar bara fälten vi behöver
const API_URL =
  "https://countries.dev/countries?fields=name,alpha3Code,region,capital,flags,population,area";

// hämtar alla länder till startsidan
export async function getCountries(): Promise<Countries[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Kunde inte hämta länder");
  }

  const data: unknown = await response.json();

  // kolla att vi faktiskt fick en lista
  if (!Array.isArray(data)) {
    throw new Error("Ogiltigt svar från API:et");
  }

  return data as Countries[];
}

// hämtar ett land via landskoden, null om det inte finns
export async function getCountry(
  code: string
): Promise<CountryDetails | null> {
  const response = await fetch(
    `https://countries.dev/alpha/${encodeURIComponent(code)}`
  );

  
  // 404 = landet finns inte
  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Kunde inte hämta landet");
  }

  return (await response.json()) as CountryDetails;
}