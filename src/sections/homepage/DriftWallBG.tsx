"use client";
import DriftWall, { type DriftWallItem } from "@/components/DriftWall";
import { formatImagePath } from "@/lib/watch-utils";
import { useQueryOptions } from "@/query-options/QueryOptions";
import { useQueries } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  backdrop_path: string;
}

type ImageSize = "w300" | "w500" | "w780";

interface WallConfig {
  columns: number;
  tileWidth: number;
  tileHeight: number;
  gap: number;
  size: ImageSize;
}

// Pick a wall layout based on viewport width so multiple 16:9 columns stay
// visible on every screen size (small tiles on mobile, larger on desktop).
const getWallConfig = (width: number): WallConfig => {
  if (width < 640) {
    return { columns: 5, tileWidth: 128, tileHeight: 72, gap: 8, size: "w300" };
  }
  if (width < 1024) {
    return {
      columns: 6,
      tileWidth: 220,
      tileHeight: 124,
      gap: 12,
      size: "w500",
    };
  }
  return { columns: 8, tileWidth: 320, tileHeight: 180, gap: 16, size: "w780" };
};

export function DriftWallBG() {
  const [page1, page2] = useQueries({
    queries: [
      useQueryOptions("movie", "popular", 1),
      useQueryOptions("movie", "popular", 2),
    ],
  });

  const [config, setConfig] = useState<WallConfig>(() =>
    getWallConfig(typeof window !== "undefined" ? window.innerWidth : 1280),
  );

  useEffect(() => {
    const handleResize = () => setConfig(getWallConfig(window.innerWidth));
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      image: formatImagePath(movie.backdrop_path, config.size),
      title: movie.title ?? movie.name,
    }));

  return (
    <div className="h-full w-full overflow-hidden">
      <DriftWall
        items={items}
        columns={config.columns}
        tileWidth={config.tileWidth}
        tileHeight={config.tileHeight}
        gap={config.gap}
        speed={18}
        overlayColor="#0c0c0c"
      />
    </div>
  );
}
