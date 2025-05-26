import type { WatchCategory } from "@/types/WatchTypes";

export const watchData: Record<
  "movie" | "tv",
  { category: WatchCategory; title: string }[]
> = {
  movie: [
    { category: "trending_week", title: "Trending This Week" },
    { category: "trending_day", title: "Trending Today" },
    { category: "popular", title: "Popular Movies" },
    { category: "upcoming", title: "Upcoming" },
  ],

  tv: [
    { category: "trending_week", title: "Trending This Week" },
    { category: "trending_day", title: "Trending Today" },
    { category: "popular", title: "Popular TV Shows" },
    { category: "on_the_air", title: "On The Air" },
    { category: "airing_today", title: "Airing Today" },
    { category: "top_rated", title: "Top Rated TV Shows" },
  ],
};
