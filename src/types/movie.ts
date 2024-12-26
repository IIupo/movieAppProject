export interface Movie {
  id: number;
  title: string;
  release_date?: string;
  vote_average: number;
  overview: string;
  poster_path: string | null;
  genre_ids: number[];
  rating?: number;
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  page: number;
  total_results: number;
}
