export type MediaType = "movie" | "tv";

export type BaseMedia = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  type: MediaType;
};

export type Movie = BaseMedia & {
  media_type?: "movie";
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
};

export type TVShow = BaseMedia & {
  media_type?: "tv";
  origin_country: string[];
  original_name: string;
  first_air_date: string;
  name: string;
};

export type MediaItem = Movie &
  TVShow & {
    timeAdded: Date; // Optional field for recently viewed items
  };

export type MediaResponse = {
  page: number;
  results: MediaItem[];
  total_pages: number;
  total_results: number;
};
