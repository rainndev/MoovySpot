import { formatImagePath } from "@/lib/watch-utils";
import { useGenreOptions } from "@/query-options/QueryGenreOptions";
import { useWatchTypeStore } from "@/store/WatchTypeStore";
import type { MediaItem } from "@/types/TMDBTypes";
import { FaStar } from "react-icons/fa";
import { Link } from "@tanstack/react-router";

interface TrendingWatchContainerProps {
  itemData: MediaItem;
}

interface GenreItem {
  id: number;
  name: string;
}

const TrendingWatchCard = ({ itemData }: TrendingWatchContainerProps) => {
  const watchType = useWatchTypeStore((state) => state.watchType);

  if (!itemData.backdrop_path) {
    console.warn("No backdrop path available for item:", itemData);
    return (
      <p className="flex h-full w-full items-center justify-center">
        No Image available
      </p>
    );
  }

  const BG_IMAGE_URL = formatImagePath(itemData.backdrop_path, "w1280");
  const TITLE = itemData.title || itemData.name || "Untitled";
  const RATING = itemData.vote_average.toFixed(1);
  const YEAR =
    new Date(itemData.release_date || itemData.first_air_date).getFullYear() ||
    "Unknown Year";
  const GENRE_IDS = itemData.genre_ids || [];

  const { data: GenreList } = useGenreOptions(watchType);

  const genres =
    GenreList?.filter((genre: GenreItem) => GENRE_IDS.includes(genre.id)).slice(
      0,
      3,
    ) || [];

  // to={formatWatchUrl(itemData.id, watchType)}
  return (
    <div className="relative aspect-[3/2] h-100 w-full snap-start rounded-lg">
      <Link
        params={{ id: String(itemData.id) }}
        search={{ type: watchType }}
        to="/details/$id"
      >
        <img
          src={BG_IMAGE_URL}
          className="absolute inset-0 h-full w-full shrink-0 rounded-lg object-cover"
        />
        <div className="from-logo-black/50 absolute top-0 right-0 left-0 h-12 w-full rounded-t-lg bg-gradient-to-b to-transparent" />

        <div className="absolute top-3 right-5 flex items-center gap-2">
          <FaStar />
          <span>{RATING}</span>
        </div>
        <div className="from-logo-black/90 absolute right-0 bottom-0 left-0 rounded-b-lg bg-gradient-to-t from-40% to-transparent p-5">
          <p className="font-[ClashDisplay] text-[clamp(1.2rem,3vw,1.5rem)] font-medium">
            {TITLE}{" "}
            <span className="text-logo-white/80 ml-1 text-[clamp(.5rem,3vw,1rem)] font-normal">
              ({YEAR})
            </span>
          </p>
          <p className="text-logo-white/80 mt-2 flex flex-wrap space-x-1 text-[clamp(.6rem,3vw,.8rem)] font-normal">
            {genres?.map((genre: GenreItem) => (
              <span
                className="bg-logo-white/10 mt-1 rounded-sm px-4 py-2"
                key={genre.id}
              >
                {genre.name}
              </span>
            ))}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default TrendingWatchCard;
