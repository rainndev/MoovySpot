import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const GRID_CARD_COUNT = 12;
const GENRE_PILL_WIDTHS = ["w-16", "w-20", "w-14", "w-24", "w-18", "w-16"];

/** Placeholder pills shown while the genre list is fetching. */
export const CategoryGenreSkeleton = () => (
  <>
    {GENRE_PILL_WIDTHS.map((width, index) => (
      <li key={index} aria-hidden="true">
        <Skeleton className={cn("h-8 rounded-full", width)} />
      </li>
    ))}
  </>
);

/** Mirrors the responsive `CategoryCard` poster grid. */
const CategoryGridSkeleton = () => (
  <div
    aria-hidden="true"
    className="mt-5 grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6"
  >
    {Array.from({ length: GRID_CARD_COUNT }, (_, index) => (
      <Skeleton
        key={index}
        className="aspect-[3/4] w-full rounded-lg md:rounded-2xl"
      />
    ))}
  </div>
);

export default CategoryGridSkeleton;
