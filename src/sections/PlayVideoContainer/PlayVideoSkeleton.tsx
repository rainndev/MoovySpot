import { Skeleton } from "@/components/ui/skeleton";

const CARD_COUNT = 8;

/** Mirrors the episode / up-next card grid used in the right rail. */
export const PlayCardGridSkeleton = () => (
  <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:gap-2 lg:grid-cols-4">
    {Array.from({ length: CARD_COUNT }, (_, index) => (
      <div
        key={index}
        className="border-logo-white/10 rounded-xl border bg-black/30 p-1"
      >
        <div className="bg-logo-white/5 border-logo-white/5 relative overflow-hidden rounded-md border">
          <Skeleton className="aspect-video w-full rounded-none" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-1.5 md:p-2">
            <Skeleton className="h-4 w-9 rounded-xs" />
            <Skeleton className="h-2.5 w-4/5 rounded-full" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

/**
 * Mirrors `PlayVideoPage`: the "Now Playing" header, the player frame with its
 * server controls, then the up-next rail.
 */
const PlayVideoSkeleton = () => (
  <div
    aria-hidden="true"
    className="bg-logo-black text-logo-white mx-auto min-h-dvh w-full max-w-7xl p-3 md:px-10 md:pt-28 md:pb-10"
  >
    <div className="mx-auto flex w-full flex-col gap-5">
      <div className="flex flex-col">
        <Skeleton className="h-3.5 w-24 rounded-full" />
        <Skeleton className="mt-2 h-[clamp(2.25rem,6vw,4rem)] w-64 max-w-[70%] rounded-lg" />
      </div>

      <div className="flex flex-col gap-5">
        <section className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/40">
            <Skeleton className="aspect-video w-full rounded-none" />
          </div>

          <div className="border-logo-white/10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-3 backdrop-blur-sm sm:p-4">
            <Skeleton className="h-3.5 w-16 rounded-full" />
            <div className="ml-auto flex items-center gap-2">
              <Skeleton className="h-9 w-[8.75rem] rounded-md" />
              <Skeleton className="h-9 w-16 rounded-md" />
            </div>
          </div>
        </section>

        <aside className="h-fit w-full">
          <div className="mb-4 flex items-end justify-between gap-3">
            <Skeleton className="mt-5 h-6 w-40 rounded-full" />
            <Skeleton className="h-9 w-35 rounded-md" />
          </div>

          <PlayCardGridSkeleton />
        </aside>
      </div>
    </div>
  </div>
);

export default PlayVideoSkeleton;
