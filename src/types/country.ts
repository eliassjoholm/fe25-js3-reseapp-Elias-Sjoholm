export interface Countries {
  name: string;
  alpha3Code: string;
  region: string;
  capital: string | null;
  flags: {
    svg: string;
    png: string;
  };
  population: number;
  area: number | null;
}

export interface CountryDetails extends Countries {
  alpha2Code: string;
  nativeName?: string;
  subregion?: string;
  latlng?: number[];
  languages?: { name: string }[];
  currencies?: { code: string; name: string; symbol?: string }[];
}