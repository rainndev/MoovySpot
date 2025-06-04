import { Link } from "react-router-dom";
import { formatImagePath, formatWatchUrl } from "@/lib/watch-utils";
import type { MediaItem } from "@/types/TMDBTypes";

interface CollectionCardProps {
  movie: MediaItem;
}

const CollectionCard = ({ movie }: CollectionCardProps) => {
  const type = movie.type;

  if (!movie.poster_path) return null;
  if (!movie.title && !movie.name) return null;

  return (
    <Link to={formatWatchUrl(movie.id, type)}>
      <div className="group h-full w-full flex-shrink-0 snap-start overflow-hidden">
        <div className="bg-logo-black/50 relative w-full overflow-hidden rounded-lg transition-all duration-300 ease-in-out hover:shadow-xl md:rounded-2xl">
          <div className="w-full">
            <img
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              loading="lazy"
              src={formatImagePath(movie.poster_path, "w300")}
              alt={movie.title || movie.name}
              draggable="false"
              className="aspect-[3/4] h-full w-full scale-100 object-cover opacity-90 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-50 active:scale-105 active:opacity-50"
            />
          </div>

          <div className="bg-logo-black/50 pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#14c4b4)]" />
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
