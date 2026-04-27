import MediaPosterCard from "@/components/MediaPosterCard";
import type { MediaItem } from "@/types/TMDBTypes";

interface CategoryCardProps {
  movie: MediaItem;
}
const CategoryCard = ({ movie }: CategoryCardProps) => {
  return (
    <MediaPosterCard
      media={movie}
      type={movie.type}
      animated
      wrapperClassName="w-full"
    />
  );
};

export default CategoryCard;
