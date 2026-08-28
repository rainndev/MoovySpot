import { formatImagePath } from "@/lib/watch-utils";
import { useWatchTypeStore } from "@/store/WatchTypeStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useIsDesktop } from "@/hooks/use-media-query";
import type { MediaItem, MediaResponse } from "@/types/TMDBTypes";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useMemo, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import CircularGallery from "./CircularGallery";

interface TrendingWatchContainerProps {
  data: MediaResponse;
}

const TrendingWatchContainer = ({ data }: TrendingWatchContainerProps) => {
  const navigate = useNavigate();
  const watchType = useWatchTypeStore((state) => state.watchType);
  const lowPowerModeEnabled = useSettingsStore(
    (state) => state.lowPowerModeEnabled,
  );
  const sectionRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

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

  const scrollOneCard = useCallback((direction: "left" | "right") => {
    const gallery = sectionRef.current?.querySelector<HTMLElement>(
      '[aria-label="Movie gallery"]',
    );
    const card = gallery?.querySelector<HTMLElement>("button");
    if (!gallery || !card) return;

    const gap = Number.parseFloat(getComputedStyle(gallery).columnGap) || 16;
    gallery.scrollBy({
      left: (card.offsetWidth + gap) * (direction === "right" ? 1 : -1),
      behavior: "smooth",
    });
  }, []);

  if (!galleryItems.length) return null;

  return (
    <div
      ref={sectionRef}
      className="relative mx-auto h-110 w-full max-w-7xl md:h-150"
    >
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

      {lowPowerModeEnabled && isDesktop && (
        <div
          className="pointer-events-none absolute top-1/2 -right-14 -left-14 z-20 flex -translate-y-1/2 items-center justify-between"
          data-testid="low-power-gallery-arrows"
        >
          <button
            type="button"
            aria-label="Previous trending movie"
            onClick={() => scrollOneCard("left")}
            className="pointer-events-auto flex size-11 items-center justify-center rounded-full border border-white/15 bg-logo-black/75 text-white shadow-xl backdrop-blur-md transition-colors hover:border-logo-blue hover:text-logo-blue focus-visible:ring-2 focus-visible:ring-logo-blue focus-visible:outline-none"
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            type="button"
            aria-label="Next trending movie"
            onClick={() => scrollOneCard("right")}
            className="pointer-events-auto flex size-11 items-center justify-center rounded-full border border-white/15 bg-logo-black/75 text-white shadow-xl backdrop-blur-md transition-colors hover:border-logo-blue hover:text-logo-blue focus-visible:ring-2 focus-visible:ring-logo-blue focus-visible:outline-none"
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      )}

      {/* Gradient fade on the scroll edges */}
      <div className="from-logo-black pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r to-transparent md:w-40" />
      <div className="from-logo-black pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l to-transparent md:w-40" />
    </div>
  );
};

export default TrendingWatchContainer;
