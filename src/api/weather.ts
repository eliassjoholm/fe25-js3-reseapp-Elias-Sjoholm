// väder från open-meteo
import type { CountryDetails } from "../types/country";
import type { Weather } from "../types/weather";

// svaret från geocoding-api:et
interface GeocodingResponse {
  results?: { latitude: number; longitude: number }[];
}

// svaret från väder-api:et
interface ForecastResponse {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
}

// Slår upp huvudstadens koordinater. countryCode gör att vi inte
// hamnar i en ort med samma namn i ett annat land.
async function getCapitalCoordinates(
  capital: string,
  countryCode: string
): Promise<{ latitude: number; longitude: number } | null> {
  const params = new URLSearchParams({
    name: capital,
    countryCode,
    count: "1",
    language: "sv",
  });
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?${params}`
  );

  if (!response.ok) {
    throw new Error("Kunde inte hämta huvudstadens position");
  }

  const data = (await response.json()) as GeocodingResponse;
  return data.results?.[0] ?? null;
}

// hämtar vädret just nu för landets huvudstad
export async function getWeather(
  country: CountryDetails
): Promise<Weather | null> {
  // Börja med landets latlng, byt till huvudstaden om den hittas
  let latitude = country.latlng?.[0];
  let longitude = country.latlng?.[1];
  let place = country.name;

  if (country.capital) {
    const capital = await getCapitalCoordinates(
      country.capital,
      country.alpha2Code
    );

    if (capital) {
      latitude = capital.latitude;
      longitude = capital.longitude;
      place = country.capital;
    }
  }

  // Varken huvudstad eller latlng finns
  if (latitude === undefined || longitude === undefined) {
    return null;
  }

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,wind_speed_10m,weather_code",
    wind_speed_unit: "ms",
    timezone: "auto",
  });
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params}`
  );

  if (!response.ok) {
    throw new Error("Kunde inte hämta vädret");
  }

  const data = (await response.json()) as ForecastResponse;

  return {
    temperature: data.current.temperature_2m,
    windSpeed: data.current.wind_speed_10m,
    weatherCode: data.current.weather_code,
    place,
  };
}