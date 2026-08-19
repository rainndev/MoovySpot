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
          <img
            src={image}
            alt={title}
            loading="lazy"
            draggable={false}
            className="h-26 w-30 rounded-xl object-cover md:h-40 md:w-44"
          />
        ) : (
          <div className="bg-logo-white/10 text-logo-white/50 flex h-20 w-24 items-center justify-center rounded-xl text-center text-[0.6rem] md:h-24 md:w-28">
            No Image
          </div>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
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
          className="bg-logo-white/10 text-logo-white hover:bg-logo-white/20 mt-1 inline-flex w-fit items-center gap-1.5 rounded-md px-3 py-1.5 text-xs transition-colors duration-200"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

const TrendingTodayContainer = ({ data }: TrendingTodayContainerProps) => {
  const watchType = useWatchTypeStore((state) => state.watchType);

  if (!data?.results?.length) return null;

  const movies = data.results
    .filter((item) => item.backdrop_path || item.poster_path)
    .slice(0, 12);

  return (
    <div className="relative isolate flex items-center py-4 md:py-20">
      {/* grid pattern background */}
      <div className="bg-logo-black absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] mask-[radial-gradient(circle_at_center,black_30%,transparent_70%)] bg-size-[6rem_4rem] [-webkit-mask-image:radial-gradient(circle_at_center,black_30%,transparent_70%)]" />

      <div className="hide-scrollbar 3xl:grid-cols-5 mx-auto flex w-full max-w-7xl snap-x snap-mandatory gap-2 overflow-x-auto sm:grid sm:grid-cols-2 sm:overflow-visible xl:grid-cols-3">
        {movies.map((movie: MediaItem) => (
          <InterestCard key={movie.id} movie={movie} type={watchType} />
        ))}
      </div>
    </div>
  );
};

export default TrendingTodayContainer;
