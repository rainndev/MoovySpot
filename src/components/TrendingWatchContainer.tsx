import { formatImagePath } from "@/lib/watch-utils";
import { useWatchTypeStore } from "@/store/WatchTypeStore";
import type { MediaItem, MediaResponse } from "@/types/TMDBTypes";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import CircularGallery from "./CircularGallery";

interface TrendingWatchContainerProps {
  data: MediaResponse;
}

const TrendingWatchContainer = ({ data }: TrendingWatchContainerProps) => {
  const navigate = useNavigate();
  const watchType = useWatchTypeStore((state) => state.watchType);

  // Desktop bends the gallery upward (-2); mobile uses a gentle downward bend (1).
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 768px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const trending = useMemo(() => {
    if (!data?.results?.length) return [];

    return data.results
      .filter((item) => item.poster_path || item.backdrop_path)
      .slice(0, 12)
      .map((item: MediaItem) => ({
        id: item.id,
        image: formatImagePath(item.poster_path || item.backdrop_path, "w780"),
        text: item.title || item.name || "Untitled",
      }));
  }, [data]);

  const galleryItems = useMemo(
    () => trending.map(({ image, text }) => ({ image, text })),
    [trending],
  );

  const handleItemClick = useCallback(
    (index: number) => {
      const item = trending[index];
      if (!item) return;

      navigate({
        to: "/details/$id",
        params: { id: String(item.id) },
        search: { type: watchType },
      });
    },
    [trending, navigate, watchType],
  );

  if (!galleryItems.length) return null;

  return (
    <div className="relative h-110 w-full md:h-150">
      <CircularGallery
        items={galleryItems}
        onItemClick={handleItemClick}
        bend={isDesktop ? -2 : -0.5}
        textColor="#faf9f6"
        borderRadius={0.05}
        scrollEase={0.05}
        scrollSpeed={2}
        font="bold 30px ClashDisplay"
      />
    </div>
  );
};

export default TrendingWatchContainer;
