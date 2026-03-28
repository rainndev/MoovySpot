import { Link } from "@tanstack/react-router";
// import { FaStar } from "react-icons/fa";
import { formatImagePath } from "@/lib/watch-utils";
import { useWatchTypeStore } from "@/store/WatchTypeStore";
import type { MediaItem } from "@/types/TMDBTypes";

interface WatchCardProps {
  movie: MediaItem;
}

const WatchCard = ({ movie }: WatchCardProps) => {
  const watchType = useWatchTypeStore((state) => state.watchType);
  // const date = movie.release_date || movie.first_air_date;
  const timeAdded = movie.timeAdded;

  if (!movie.poster_path) return null;
  if (!movie.title && !movie.name) return null;

  // to={formatWatchUrl(movie.id, watchType)}
  return (
    <Link
      params={{ id: String(movie.id) }}
      search={{ type: watchType }}
      to="/details/$id"
    >
      <div
        className={`group h-full ${timeAdded ? "w-full" : "w-[150px] md:w-[180px] xl:w-[230px]"} flex-shrink-0 snap-start overflow-hidden`}
      >
        <div className="border-logo-white/10 shadow-bg bg-logo-black/50 relative w-full overflow-hidden rounded-lg border transition-all duration-300 ease-in-out hover:shadow-xl md:rounded-2xl">
          <div className="aspect-[3/4]">
            <img
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              loading="lazy"
              src={formatImagePath(movie.poster_path, "w300")}
              alt={movie.title || movie.name}
              draggable="false"
              className={`aspect-[3/4] scale-100 object-cover opacity-90 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-50 active:scale-105 active:opacity-50`}
            />
          </div>

          <div className="bg-logo-black/50 pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#14c4b4)]" />
        </div>
      </div>
    </Link>
  );
};

export default WatchCard;
