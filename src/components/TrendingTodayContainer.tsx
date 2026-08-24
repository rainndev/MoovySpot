import { formatImagePath } from "@/lib/watch-utils";
import { useOptionsImages } from "@/query-options/QueryOptions";
import { useWatchTypeStore } from "@/store/WatchTypeStore";
import type { MediaItem, MediaResponse, MediaType } from "@/types/TMDBTypes";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface TrendingTodayContainerProps {
  data: MediaResponse;
}

interface InterestCardProps {
  movie: MediaItem;
  type: MediaType;
  rank: number;
}

interface MediaImage {
  file_path: string;
  iso_639_1?: string | null;
}

const InterestCard = ({ movie, type, rank }: InterestCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageRotation, setImageRotation] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const { data: imageData } = useQuery({
    ...useOptionsImages(type, movie.id),
  });
  const isFeatured = rank === 1;
  const title = movie.title || movie.name || "Untitled";
  const rating = Math.round(((movie.vote_average ?? 0) / 2) * 2) / 2;
  const titleImage = useMemo(() => {
    const logos = (imageData?.logos ?? []) as MediaImage[];
    const logo =
      logos.find((item) => item.iso_639_1 === "en") ??
      logos.find((item) => !item.iso_639_1) ??
      logos[0];

    return logo ? formatImagePath(logo.file_path, "w300") : null;
  }, [imageData]);
  const availableImages = useMemo(
    () =>
      [
        movie.backdrop_path || movie.poster_path,
        ...((imageData?.backdrops ?? []) as MediaImage[]).map(
          (item) => item.file_path,
        ),
        ...((imageData?.posters ?? []) as MediaImage[]).map(
          (item) => item.file_path,
        ),
      ].filter((path, index, images) => path && images.indexOf(path) === index),
    [imageData, movie.backdrop_path, movie.poster_path],
  );

  useEffect(() => {
    setImageIndex(0);
  }, [movie.id]);

  useEffect(() => {
    if (!isHovered || availableImages.length < 2) return;

    const interval = window.setInterval(() => {
      setImageIndex(
        (currentIndex) => (currentIndex + 1) % availableImages.length,
      );
    }, 1000);

    return () => window.clearInterval(interval);
  }, [availableImages.length, isHovered]);

  return (
    <div
      onMouseEnter={() => {
        setImageRotation(Math.random() * 6 - 3);
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex w-[85vw] max-w-sm shrink-0 snap-start flex-col gap-3 rounded-2xl p-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center ${
        isFeatured ? "sm:col-span-2 sm:gap-6" : ""
      }`}
    >
      <div className="flex items-center gap-3 sm:contents">
        <span
          aria-label={`Trend rank ${rank}`}
          className={`text-shadow-logo-blue text-shadow-2xl group-hover:text-logo-blue w-10 shrink-0 text-center font-[ClashDisplay] text-9xl leading-none font-semibold text-transparent transition-colors duration-300 ease-in-out [-webkit-text-stroke:2px_var(--color-logo-blue)] sm:w-12 sm:text-9xl ${
            isFeatured ? "sm:w-24 sm:text-[15rem]" : ""
          }`}
        >
          {rank}
        </span>
        <Link
          to="/details/$id"
          params={{ id: String(movie.id) }}
          search={{ type }}
          aria-label={title}
          className="min-w-0 flex-1 sm:flex-none sm:shrink-0"
        >
          {availableImages.length ? (
            <motion.div
              animate={{
                rotate: isHovered ? imageRotation : 0,
                scale: isHovered ? 1.04 : 1,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className="flex w-full flex-col items-center sm:w-auto"
            >
              <div className="to-logo-background/50 from-logo-white/20 w-full rounded-2xl bg-linear-to-b via-[#292929] p-1 font-mono text-[10px] font-medium tracking-[0.08em] text-white/80 uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:w-auto sm:rounded-4xl">
                <div className="relative overflow-hidden rounded-[15px] sm:rounded-[30px]">
                  <div
                    className={`relative aspect-video w-full sm:aspect-auto ${
                      isFeatured
                        ? "sm:h-52 sm:w-80 lg:h-60 lg:w-96"
                        : "sm:h-26 sm:w-40 md:h-40 md:w-54"
                    }`}
                  >
                    {availableImages.map((path, index) => (
                      <img
                        key={path}
                        src={formatImagePath(path, "w300")}
                        alt={index === 0 ? title : `${title} still ${index}`}
                        loading={index === 0 ? "lazy" : undefined}
                        draggable={false}
                        className={`absolute inset-0 h-full w-full rounded-[15px] object-cover transition-opacity duration-700 sm:rounded-[30px] ${
                          index === imageIndex ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-black/70" />
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-logo-white/10 text-logo-white/50 flex aspect-video w-full items-center justify-center rounded-xl text-center text-[0.6rem] sm:aspect-auto sm:h-20 sm:w-24 md:h-24 md:w-28">
              No Image
            </div>
          )}
        </Link>
      </div>
      <div className="flex min-w-0 flex-col items-center justify-end gap-1 sm:flex-1 sm:items-start">
        <Link
          to="/details/$id"
          params={{ id: String(movie.id) }}
          search={{ type }}
          aria-label={title}
          className="flex h-10 w-full max-w-35 items-center justify-center sm:h-14 sm:max-w-55 sm:justify-start"
        >
          {titleImage ? (
            <img
              src={titleImage}
              alt={`${title} title`}
              draggable={false}
              className="max-h-full max-w-full object-contain object-center sm:object-left"
            />
          ) : (
            <span className="truncate font-[ClashDisplay] text-[clamp(1.125rem,2.5vw,1.25rem)] font-medium text-white">
              {title}
            </span>
          )}
        </Link>
        <div
          aria-label={`${rating} out of 5 stars`}
          className={`text-logo-blue flex w-fit items-center ${isFeatured ? "md:text-lg" : "text-[10px] md:text-xs"}`}
        >
          {Array.from({ length: 5 }, (_, index) => {
            const starValue = index + 1;

            if (rating >= starValue) {
              return <FaStar key={starValue} aria-hidden="true" />;
            }

            if (rating >= starValue - 0.5) {
              return <FaStarHalfAlt key={starValue} aria-hidden="true" />;
            }

            return <FaRegStar key={starValue} aria-hidden="true" />;
          })}
          <span className="text-logo-white ml-1">{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

const TrendingTodayContainer = ({ data }: TrendingTodayContainerProps) => {
  const watchType = useWatchTypeStore((state) => state.watchType);
  const movies = (data?.results ?? [])
    .filter((item) => item.backdrop_path || item.poster_path)
    .slice(0, 10);

  if (!movies.length) return null;

  return (
    <div className="relative isolate flex items-center overflow-hidden py-4 md:py-20">
      {/* Dark gradient masks keep the cards readable as backdrops change. */}
      <div className="from-logo-black via-logo-black/35 to-logo-black absolute inset-0 -z-10 bg-linear-to-r" />
      <div className="from-logo-black/90 to-logo-black/90 absolute inset-0 -z-10 bg-linear-to-b via-transparent" />

      {/* grid pattern background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] mask-[radial-gradient(circle_at_center,black_30%,transparent_70%)] bg-size-[16px_16px]" />

      <div className="hide-scrollbar 3xl:grid-cols-5 mx-auto flex w-full max-w-7xl snap-x snap-mandatory gap-3 overflow-x-auto sm:grid sm:grid-cols-2 sm:overflow-visible xl:grid-cols-3">
        {movies.map((movie: MediaItem, index) => (
          <InterestCard
            key={movie.id}
            movie={movie}
            type={watchType}
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingTodayContainer;
