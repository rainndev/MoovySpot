import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { GoChevronLeft } from "react-icons/go";

interface WatchListChildProps {
  data: any;
  type: string;
}

const WatchListChild = ({ data, type }: WatchListChildProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!data || !data.results) return null;

  return (
    <div className="relative">
      {/* Left Button */}
      <div
        onClick={() => scroll("left")}
        className="text-logo-white from-logo-black absolute top-0 left-0 z-10 flex h-full w-15 cursor-pointer items-center justify-start bg-gradient-to-r to-transparent pl-2 md:w-40"
      >
        <GoChevronLeft className="h-5 w-5 md:h-10 md:w-10" />
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="hide-scrollbar flex snap-x snap-mandatory space-x-2 overflow-x-auto overflow-y-hidden px-20 active:cursor-grabbing md:space-x-4"
      >
        {data.results.map((movie: any) => (
          <Link to={`/watch/${movie.id}?type=${type}`} key={movie.id}>
            <div className="group h-full w-[140px] flex-shrink-0 snap-start overflow-hidden md:w-[180px] xl:w-[230px]">
              <div className="border-logo-white/10 shadow-bg w-full overflow-hidden rounded-lg">
                <img
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  loading="lazy"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={type === "movie" ? movie.title : movie.name}
                  className="scale-100 object-cover opacity-90 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-50 active:scale-105 active:opacity-50"
                />
              </div>
              <h2 className="mt-5 truncate text-[clamp(.8rem,3vw,1.1rem)] font-normal text-white">
                {type === "movie" ? movie.title : movie.name}
              </h2>
              <div className="mt-1 mb-4 flex items-center justify-between text-[clamp(.65rem,3vw,.9rem)]">
                <p className="text-gray-400">
                  {type === "movie"
                    ? movie.release_date.split("-")[0]
                    : movie.first_air_date.split("-")[0]}
                </p>
                <div className="flex items-center text-yellow-400">
                  <FaStar />
                  <p className="ml-2">{movie.vote_average.toFixed(1)}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Right Button */}
      <div
        onClick={() => scroll("right")}
        className="text-logo-white from-logo-black absolute top-0 right-0 z-10 flex h-full w-15 cursor-pointer items-center justify-end bg-gradient-to-l to-transparent pr-2 md:w-40"
      >
        <GoChevronLeft className="h-5 w-5 rotate-180 md:h-10 md:w-10" />
      </div>
    </div>
  );
};

export default WatchListChild;
