import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type HomepageSkeletonVariant = "rail" | "ranking" | "bento";

const HeadingSkeleton = ({ className }: { className?: string }) => (
  <Skeleton className={cn("mx-auto mb-5 h-6 w-52 rounded-full", className)} />
);

/** Mirrors `TrendingWatchContainer` — the curved poster gallery. */
const RailSkeleton = () => {
  const sizes = [
    "h-32 w-24 md:h-44 md:w-36",
    "h-44 w-28 md:h-60 md:w-40",
    "h-56 w-32 md:h-76 md:w-44",
    "h-44 w-28 md:h-60 md:w-40",
    "h-32 w-24 md:h-44 md:w-36",
  ];

  return (
    <section aria-hidden="true" className="relative mb-10">
      <HeadingSkeleton className="w-56" />
      <div className="mx-auto flex h-110 w-full max-w-7xl items-center justify-center gap-4 overflow-hidden md:h-150">
        {sizes.map((size, index) => (
          <Skeleton key={index} className={cn("shrink-0 rounded-2xl", size)} />
        ))}
      </div>
    </section>
  );
};

/** Mirrors `TrendingTodayContainer` — grid of ranked cards. */
const RankingSkeleton = () => (
  <section aria-hidden="true" className="relative mb-10">
    <HeadingSkeleton className="w-48" />
    <div className="mx-auto grid w-full max-w-7xl gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className="flex items-center gap-3 p-3">
          <Skeleton className="h-16 w-7 shrink-0 rounded-md" />
          <Skeleton className="h-24 w-24 shrink-0 rounded-xl sm:h-28 sm:w-40" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  </section>
);

const BENTO_SPANS = [
  "col-span-2 row-span-2 md:col-span-1 md:row-span-2",
  "col-span-2 row-span-1 md:col-span-2",
  "col-span-1 row-span-1 md:col-span-1",
  "col-span-1 row-span-1 md:col-span-1",
  "col-span-2 row-span-1 md:col-span-2",
  "col-span-2 row-span-1 md:col-span-1",
];

/** Mirrors `PopularSection` — the bento grid. */
const BentoSkeleton = () => (
  <section
    aria-hidden="true"
    className="relative isolate mx-auto mb-10 w-full max-w-7xl"
  >
    <HeadingSkeleton className="w-32" />
    <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[180px] md:auto-rows-[150px] md:grid-cols-4 lg:auto-rows-[170px]">
      {BENTO_SPANS.map((span, index) => (
        <Skeleton
          key={index}
          className={cn("rounded-3xl md:rounded-4xl", span)}
        />
      ))}
    </div>
  </section>
);

const HomepageSectionSkeleton = ({
  variant,
}: {
  variant: HomepageSkeletonVariant;
}) => {
  if (variant === "ranking") return <RankingSkeleton />;
  if (variant === "bento") return <BentoSkeleton />;
  return <RailSkeleton />;
};

export default HomepageSectionSkeleton;
