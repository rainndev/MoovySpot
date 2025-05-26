export type MovieCategory =
  | "popular"
  | "top_rated"
  | "upcoming"
  | "now_playing"
  | "latest"
  | "trending_week"
  | "trending_day";

export type TvCategory =
  | "popular"
  | "top_rated"
  | "on_the_air"
  | "airing_today"
  | "latest";

export type WatchCategory = MovieCategory | TvCategory;

export interface WatchType {
  type: string;
  category: "popular" | "top_rated" | "upcoming" | "now_playing";
  page?: number;
}
