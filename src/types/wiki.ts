// typ för wikipedia-sammanfattningen
export interface WikiSummary {
  title: string;
  extract: string;
  imageUrl: string | null;
  articleUrl: string;
}