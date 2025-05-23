import { useRef } from "react";
import { GoChevronLeft } from "react-icons/go";
import WatchCard from "./WatchCard";

interface WatchListChildProps {
  data: [] | any;
}

const WatchCardContainer = ({ data }: WatchListChildProps) => {
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
          <WatchCard movie={movie} />
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

export default WatchCardContainer;
