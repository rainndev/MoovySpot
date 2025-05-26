"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { formatImagePath } from "@/lib/utils";
import { useQueryOptions } from "@/query-options/QueryOptions";
import { useQueries } from "@tanstack/react-query";

interface Movie {
  poster_path: string;
}

export function ThreeDMarqueeBG() {
  const [page1, page2] = useQueries({
    queries: [
      useQueryOptions("movie", "popular", 1),
      useQueryOptions("movie", "popular", 2),
    ],
  });

  if (page1.isLoading && page2.isLoading) return;

  if (page1.isError && page2.isError)
    return (
      <div className="flex h-full w-full items-center justify-center">
        Error: {page1.error.message} {page2.error.message}
      </div>
    );

  if (!page1.data || !page2.data) return;

  // merge page1 and page2 data
  const movieData = [...page1.data?.results, ...page2.data?.results];

  // get images from movieData
  const images: string[] = movieData.map((movie: Movie) =>
    formatImagePath(movie.poster_path, "w300"),
  );

  return (
    <div className="h-full">
      <ThreeDMarquee images={images} />
    </div>
  );
}
