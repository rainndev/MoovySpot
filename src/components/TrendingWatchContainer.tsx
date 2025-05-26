import type { MediaItem, MediaResponse } from "@/types/TMDBTypes";
import TrendingWatchCard from "./TrendingWatchCard";

interface TrendingWatchContainerProps {
  data: MediaResponse; // Replace 'any' with the actual type of data you expect
}

const TrendingWatchContainer = ({ data }: TrendingWatchContainerProps) => {
  return (
    <div className="flex w-full snap-x snap-mandatory space-x-2 overflow-x-scroll active:cursor-grabbing md:space-x-2">
      {data.results.map((itemData: MediaItem) => (
        <TrendingWatchCard itemData={itemData} />
      ))}
    </div>
  );
};

export default TrendingWatchContainer;
