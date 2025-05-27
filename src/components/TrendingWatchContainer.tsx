import type { MediaItem, MediaResponse } from "@/types/TMDBTypes";
import TrendingWatchCard from "./TrendingWatchCard";
import { GoChevronLeft } from "react-icons/go";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";

interface TrendingWatchContainerProps {
  data: MediaResponse; // Replace 'any' with the actual type of data you expect
}

const TrendingWatchContainer = ({ data }: TrendingWatchContainerProps) => {
  const { scrollRef, scroll } = useHorizontalScroll();

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="hide-scrollbar flex w-full snap-x snap-mandatory space-x-2 overflow-x-scroll active:cursor-grabbing md:space-x-2"
      >
        {/* Left Button */}
        <div
          onClick={() => scroll("left")}
          className="text-logo-white from-logo-black absolute top-0 left-0 z-10 hidden h-full w-15 cursor-pointer items-center justify-start bg-gradient-to-r to-transparent pl-2 md:flex md:w-40"
        >
          <GoChevronLeft className="h-5 w-5 md:h-10 md:w-10" />
        </div>

        {data.results.map((itemData: MediaItem, i: number) => (
          <TrendingWatchCard key={i} itemData={itemData} />
        ))}

        {/* Right Button */}
        <div
          onClick={() => scroll("right")}
          className="text-logo-white from-logo-black absolute top-0 right-0 z-10 hidden h-full w-15 cursor-pointer items-center justify-end bg-gradient-to-l to-transparent pr-2 md:flex md:w-40"
        >
          <GoChevronLeft className="h-5 w-5 rotate-180 md:h-10 md:w-10" />
        </div>
      </div>
    </div>
  );
};

export default TrendingWatchContainer;
