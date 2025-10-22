import { Link } from "@tanstack/react-router";
import { getTimeAgo, formatImagePath } from "@/lib/watch-utils";
import { CiClock2 } from "react-icons/ci";
import type { MediaItem } from "@/types/TMDBTypes";
import { MdDelete } from "react-icons/md";
import { useWatchListStore } from "@/store/WatchListStore";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface WatchCardProps {
  movie: MediaItem;
  isEdit?: boolean;
}

const DetailsCardWithTime = ({ isEdit = false, movie }: WatchCardProps) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, {
    amount: 0.3,
    once: true,
  });

  useEffect(() => {
    const delay = Math.random() * 0.2;
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          delay,
          duration: 0.4,
          ease: "easeOut",
        },
      });
    }
  }, [inView]);

  const remoteWatchList = useWatchListStore((state) => state.removeWatchList);
  const type = movie.type;
  const date = movie.release_date || movie.first_air_date;
  const timeAdded = movie.timeAdded;

  if (!movie.poster_path) return null;
  if (!movie.title && !movie.name) return null;

  return (
    <Link
      disabled={isEdit}
      className={`group h-full ${timeAdded ? "w-full" : "w-[120px] md:w-[180px] xl:w-[230px]"} flex-shrink-0 snap-start overflow-hidden`}
      params={{ id: String(movie.id) }}
      search={{ type: type }}
      to={"/details/$id"}
    >
      <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={controls}>
        <div
          className={`${isEdit ? "bg-logo-black" : "bg-logo-black/50"} relative w-full overflow-hidden rounded-lg transition-all duration-300 ease-in-out hover:shadow-xl md:rounded-2xl`}
        >
          <div className="w-full">
            <img
              data-testid="card-show-image"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              loading="lazy"
              src={formatImagePath(movie.poster_path, "w300")}
              alt={movie.title || movie.name}
              draggable="false"
              className={`aspect-[3/4] h-full w-full scale-100 object-cover ${isEdit ? "opacity-10" : "opacity-90"} shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-50 active:scale-105 active:opacity-50`}
            />
          </div>
          <div
            data-testid="delete-item-watchlist"
            onClick={() => remoteWatchList(movie.id)}
            className={`${isEdit ? "absolute" : "hidden"} top-0 right-0 z-2 p-3`}
          >
            <MdDelete className="text-logo-blue text-[clamp(1rem,3vw,1.5rem)]" />
          </div>
          <div className="bg-logo-black/50 pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#14c4b4)]" />
        </div>

        {/* <h2 className="mt-5 truncate text-[clamp(.8rem,3vw,1.1rem)] font-normal text-white">
          {movie.title || movie.name}
        </h2>
        */}
        <div className="mt-2 mb-4 flex items-center justify-between text-[clamp(.65rem,3vw,.8rem)]">
          <p className="text-logo-white/50">
            {date ? new Date(date).getFullYear() : "Unknown Year"}
          </p>

          <div className="text-logo-white/50 flex items-center gap-1">
            <CiClock2 />
            {getTimeAgo(timeAdded)}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default DetailsCardWithTime;
