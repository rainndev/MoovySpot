import MediaPosterCard from "@/components/MediaPosterCard";
import { getTimeAgo } from "@/lib/watch-utils";
import { useWatchListStore } from "@/store/WatchListStore";
import type { MediaItem } from "@/types/TMDBTypes";
import { CiClock2 } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

interface WatchCardProps {
  movie: MediaItem;
  isEdit?: boolean;
}

const DetailsCardWithTime = ({ isEdit = false, movie }: WatchCardProps) => {
  const remoteWatchList = useWatchListStore((state) => state.removeWatchList);
  const type = movie.type;
  const date = movie.release_date || movie.first_air_date;
  const timeAdded = movie.timeAdded;

  return (
    <MediaPosterCard
      media={movie}
      type={type}
      disableLink={isEdit}
      animated
      linkClassName={
        timeAdded ? "w-full" : "w-[120px] md:w-[180px] xl:w-[230px]"
      }
      cardClassName={isEdit ? "bg-logo-black" : "bg-logo-black/50"}
      imageClassName={isEdit ? "opacity-10" : "opacity-90"}
      imageTestId="card-show-image"
      topRightSlot={
        <div
          data-testid="delete-item-watchlist"
          onClick={() => remoteWatchList(movie.id)}
          className={`${isEdit ? "absolute" : "hidden"} top-0 right-0 z-2 p-3`}
        >
          <MdDelete className="text-logo-blue text-[clamp(1rem,3vw,1.5rem)]" />
        </div>
      }
    >
      <div className="mt-2 mb-4 flex items-center justify-between text-[clamp(.65rem,3vw,.8rem)]">
        <p className="text-logo-white/50">
          {date ? new Date(date).getFullYear() : "Unknown Year"}
        </p>

        <div className="text-logo-white/50 flex items-center gap-1">
          <CiClock2 />
          {getTimeAgo(timeAdded)}
        </div>
      </div>
    </MediaPosterCard>
  );
};

export default DetailsCardWithTime;
