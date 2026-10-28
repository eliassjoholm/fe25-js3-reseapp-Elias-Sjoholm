import type { WikiSummary } from "../types/wiki";

interface WikiResponse {
  type: string;
  title: string;
  extract: string;
  thumbnail?: { source: string };
  content_urls: { desktop: { page: string } };
}

export async function getWikiSummary(
  countryName: string
): Promise<WikiSummary | null> {
  // "Bolivia (Plurinational State of)" -> "Bolivia", så att artikeln hittas
  const title = countryName.replace(/ \(.*\)$/, "");

  const response = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
  );

  // 404 betyder att det inte finns någon artikel med det namnet
  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Kunde inte hämta introtexten");
  }

  const data = (await response.json()) as WikiResponse;

  // T.ex. en förgreningssida ("disambiguation") är ingen artikel om landet
  if (data.type !== "standard") {
    return null;
  }

  return {
    title: data.title,
    extract: data.extract,
    imageUrl: data.thumbnail?.source ?? null,
    articleUrl: data.content_urls.desktop.page,
  };
}