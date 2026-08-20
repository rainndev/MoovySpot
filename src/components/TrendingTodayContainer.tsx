import { formatImagePath } from "@/lib/watch-utils";
import { useWatchTypeStore } from "@/store/WatchTypeStore";
import type { MediaItem, MediaResponse, MediaType } from "@/types/TMDBTypes";
import { Link } from "@tanstack/react-router";

interface TrendingTodayContainerProps {
  data: MediaResponse;
}

interface InterestCardProps {
  movie: MediaItem;
  type: MediaType;
}

const InterestCard = ({ movie, type }: InterestCardProps) => {
  const title = movie.title || movie.name || "Untitled";
  const image = formatImagePath(
    movie.backdrop_path || movie.poster_path,
    "w300",
  );
  const totalInterest = (movie.vote_count ?? 0).toLocaleString();

  return (
    <div className="flex w-[85vw] max-w-sm shrink-0 snap-start gap-3 rounded-2xl p-3 transition-colors duration-200 sm:w-auto sm:max-w-none">
      <Link
        to="/details/$id"
        params={{ id: String(movie.id) }}
        search={{ type }}
        className="shrink-0"
      >
        {image ? (
          <div className="flex flex-col items-center">
            <div className="to-logo-background/50 from-logo-white/20 rounded-4xl bg-linear-to-b via-[#292929] p-1 font-mono text-[10px] font-medium tracking-[0.08em] text-white/80 uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="relative overflow-hidden rounded-[30px]">
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  draggable={false}
                  className="h-26 w-40 rounded-[30px] object-cover md:h-40 md:w-54"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-black/70" />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-logo-white/10 text-logo-white/50 flex h-20 w-24 items-center justify-center rounded-xl text-center text-[0.6rem] md:h-24 md:w-28">
            No Image
          </div>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-end gap-1">
        <Link
          to="/details/$id"
          params={{ id: String(movie.id) }}
          search={{ type }}
          className="hover:text-logo-blue truncate font-[ClashDisplay] text-[clamp(1.125rem,2.5vw,1.25rem)] font-medium text-white transition-colors"
        >
          {title}
        </Link>

        <p className="text-logo-white/50 text-xs">
          Total Interest: {totalInterest}
        </p>

        <Link
          to="/details/$id"
          params={{ id: String(movie.id) }}
          search={{ type }}
          className="border-logo-white/10 text-logo-white hover:bg-logo-white/20 mt-1 inline-flex w-fit items-center gap-1.5 rounded-full border px-6 py-1.5 text-xs transition-colors duration-200"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

const TrendingTodayContainer = ({ data }: TrendingTodayContainerProps) => {
  const watchType = useWatchTypeStore((state) => state.watchType);
  const movies = (data?.results ?? [])
    .filter((item) => item.backdrop_path || item.poster_path)
    .slice(0, 12);

  if (!movies.length) return null;

  return (
    <div className="relative isolate flex items-center overflow-hidden py-4 md:py-20">
      {/* Dark gradient masks keep the cards readable as backdrops change. */}
      <div className="from-logo-black via-logo-black/35 to-logo-black absolute inset-0 -z-10 bg-linear-to-r" />
      <div className="from-logo-black/90 to-logo-black/90 absolute inset-0 -z-10 bg-linear-to-b via-transparent" />

      {/* grid pattern background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] mask-[radial-gradient(circle_at_center,black_30%,transparent_70%)] bg-size-[16px_16px]" />

      <div className="hide-scrollbar 3xl:grid-cols-5 mx-auto flex w-full max-w-7xl snap-x snap-mandatory gap-3 overflow-x-auto sm:grid sm:grid-cols-2 sm:overflow-visible xl:grid-cols-3">
        {movies.map((movie: MediaItem) => (
          <InterestCard key={movie.id} movie={movie} type={watchType} />
        ))}
      </div>
    </div>
  );
};

export default TrendingTodayContainer;
