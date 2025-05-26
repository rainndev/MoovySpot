import type { MediaItem } from "@/types/TMDBTypes";
import React from "react";

interface TrendingWatchContainerProps {
  itemData: MediaItem;
}

const TrendingWatchCard = ({ itemData }: TrendingWatchContainerProps) => {
  console.log("TrendingWatchCard itemData:", itemData);

  return (
    <div className="aspect-[3/2] h-100 w-full snap-start rounded-lg bg-amber-400"></div>
  );
};

export default TrendingWatchCard;
