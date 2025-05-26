import { formatImagePath, formatWatchUrl } from "@/lib/utils";
import { useWatchTypeStore } from "@/store/WatchTypeStore";
import type { MediaItem } from "@/types/TMDBTypes";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

interface TrendingWatchContainerProps {
  itemData: MediaItem;
}

const TrendingWatchCard = ({ itemData }: TrendingWatchContainerProps) => {
  const watchType = useWatchTypeStore((state) => state.watchType);

  // if (!itemData || !itemData.backdrop_path) {
  //   return (
  //     <div className="relative aspect-[3/2] h-100 w-full snap-start rounded-lg bg-gray-300">
  //       <p className="text-center text-gray-700">No Image Available</p>
  //     </div>
  //   );
  // }

  const BG_IMAGE_URL = formatImagePath(itemData.backdrop_path, "w1280");
  const TITLE = itemData.title || itemData.name || "Untitled";
  const RATING = itemData.vote_average.toFixed(1);
  return (
    <div className="relative aspect-[3/2] h-100 w-full snap-start rounded-lg">
      <Link to={formatWatchUrl(itemData.id, watchType)}>
        <img
          src={BG_IMAGE_URL}
          className="absolute inset-0 h-full w-full rounded-lg object-cover"
        />
        <div className="bg-logo-black absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#14c4b4)]" />

        <div className="absolute top-3 right-5 flex items-center gap-2">
          <FaStar />
          <span>{RATING}</span>
        </div>
        <p className="absolute bottom-3 left-5 font-[ClashDisplay] text-[clamp(1rem,3vw,1.125rem)] font-medium">
          {TITLE}
        </p>
      </Link>
    </div>
  );
};

export default TrendingWatchCard;
