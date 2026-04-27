import MediaPosterCard from "@/components/MediaPosterCard";
import type { MediaItem } from "@/types/TMDBTypes";

interface CollectionCardProps {
  movie: MediaItem;
}

const CollectionCard = ({ movie }: CollectionCardProps) => {
  return (
    <MediaPosterCard
      media={movie}
      type={movie.type}
      wrapperClassName="w-full"
    />
  );
};

export default CollectionCard;
