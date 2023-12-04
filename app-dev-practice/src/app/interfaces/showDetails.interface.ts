export interface ShowDetails {
  premiered: string;
  status: string;
  ended: string;
  language: string;
  network: {
    name: string;
    officialSite: string;
  };
  averageRuntime: number;
  type: string;
  genres: string[];
  officialSite: string;
  summary: string;
  // Add any other properties that are present in the API response
}