"use client";
import DriftWall, { type DriftWallItem } from "@/components/DriftWall";
import { formatImagePath } from "@/lib/watch-utils";
import { useQueryOptions } from "@/query-options/QueryOptions";
import { useQueries } from "@tanstack/react-query";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  backdrop_path: string;
}

export function DriftWallBG() {
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

  // merge page1 and page2 data (both guaranteed present by the guard above)
  const movieData = [...page1.data.results, ...page2.data.results];

  // map movieData to DriftWall items using landscape backdrops (16:9),
  // skipping entries that have no backdrop image
  const items: DriftWallItem[] = movieData
    .filter((movie: Movie) => Boolean(movie.backdrop_path))
    .map((movie: Movie) => ({
      image: formatImagePath(movie.backdrop_path, "w780"),
      title: movie.title ?? movie.name,
    }));

  return (
    <div className="h-full w-full overflow-hidden">
      <DriftWall
        items={items}
        columns={8}
        tileWidth={320}
        tileHeight={180}
        gap={16}
        overlayColor="#0c0c0c"
      />
    </div>
  );
}
