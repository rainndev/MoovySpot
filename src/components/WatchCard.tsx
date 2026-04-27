import MediaPosterCard from "@/components/MediaPosterCard";
import { useWatchTypeStore } from "@/store/WatchTypeStore";
import type { MediaItem } from "@/types/TMDBTypes";

interface WatchCardProps {
  movie: MediaItem;
}

const WatchCard = ({ movie }: WatchCardProps) => {
  const watchType = useWatchTypeStore((state) => state.watchType);
  const timeAdded = movie.timeAdded;

  return (
    <MediaPosterCard
      media={movie}
      type={watchType}
      wrapperClassName={
        timeAdded ? "w-full" : "w-[150px] md:w-[180px] xl:w-[230px]"
      }
      cardClassName="border-logo-white/10 shadow-bg border"
      imageWrapperClassName="aspect-[3/4]"
    />
  );
};

export default WatchCard;
