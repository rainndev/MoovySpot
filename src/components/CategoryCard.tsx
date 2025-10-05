import { Link } from "@tanstack/react-router";
import { formatImagePath } from "@/lib/watch-utils";
import type { MediaItem } from "@/types/TMDBTypes";
import { useEffect, useRef } from "react";
import { useAnimation, useInView, motion } from "motion/react";

interface CategoryCardProps {
  movie: MediaItem;
}
const CategoryCard = ({ movie }: CategoryCardProps) => {
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

  const type = movie.type;
  if (!movie.poster_path) return null;
  if (!movie.title && !movie.name) return null;

  return (
    <Link
      search={{ type: type }}
      params={{ id: String(movie.id) }}
      to="/details/$id"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        className={`group h-full w-full flex-shrink-0 snap-start overflow-hidden`}
      >
        <div className="bg-logo-black/50 relative w-full overflow-hidden rounded-lg transition-all duration-300 ease-in-out hover:shadow-xl md:rounded-2xl">
          <div className="w-full">
            <img
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              loading="lazy"
              src={formatImagePath(movie.poster_path, "w300")}
              alt={movie.title || movie.name}
              draggable="false"
              className={`aspect-[3/4] h-full w-full scale-100 object-cover opacity-90 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-50 active:scale-105 active:opacity-50`}
            />
          </div>

          <div className="bg-logo-black/50 pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#14c4b4)]" />
        </div>

        {/* <h2 className="mt-5 truncate text-[clamp(.8rem,3vw,1.1rem)] font-normal text-white">
          {movie.title || movie.name}
        </h2>
        */}
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
