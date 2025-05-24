import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useWatchTypeStore } from "@/store/WatchTypeStore";
import { formatImagePath, formatWatchUrl } from "@/lib/utils";
import type { Movie, TVShow } from "@/types/TMDBTypes";

interface WatchCardProps {
  movie: TVShow & Movie;
}

const WatchCard = ({ movie }: WatchCardProps) => {
  const type = useWatchTypeStore((state) => state.watchType);
  const date = movie.release_date || movie.first_air_date;

  return (
    <Link to={formatWatchUrl(movie.id, type)} key={movie.id}>
      <div className="group h-full w-[140px] flex-shrink-0 snap-start overflow-hidden md:w-[180px] xl:w-[230px]">
        <div className="border-logo-white/10 shadow-bg w-full overflow-hidden rounded-lg">
          <img
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            loading="lazy"
            src={formatImagePath(movie.poster_path, "w500")}
            alt={movie.title || movie.name}
            className="scale-100 object-cover opacity-90 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-50 active:scale-105 active:opacity-50"
          />
        </div>
        <h2 className="mt-5 truncate text-[clamp(.8rem,3vw,1.1rem)] font-normal text-white">
          {movie.title || movie.name}
        </h2>
        <div className="mt-1 mb-4 flex items-center justify-between text-[clamp(.65rem,3vw,.9rem)]">
          <p className="text-gray-400">
            {date ? new Date(date).getFullYear() : "Unknown Year"}
          </p>
          <div className="flex items-center text-yellow-400">
            <FaStar />
            <p className="ml-2">{movie.vote_average.toFixed(1)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WatchCard;
