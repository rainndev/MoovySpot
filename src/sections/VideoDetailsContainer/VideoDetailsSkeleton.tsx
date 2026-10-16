import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const GENRE_WIDTHS = ["w-16", "w-24", "w-20"];

/**
 * Mirrors `VideoDetailsPage` + `VideoMetadata`: full-bleed backdrop, the
 * metadata block pulled up over it, cast rail, then the action buttons.
 */
const VideoDetailsSkeleton = () => (
  <section
    aria-hidden="true"
    className="hide-scrollbar flex h-full w-full justify-center"
  >
    <div className="z-5 mx-auto w-full">
      <div className="w-full pb-20">
        <div className="flex w-full flex-col">
          {/* backdrop banner */}
          <div className="overflow-hidden">
            <div className="relative flex aspect-video h-full w-full items-center justify-center overflow-hidden">
              <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
              <div className="from-logo-black absolute inset-0 hidden bg-gradient-to-r to-transparent to-40% md:block" />
              <div className="from-logo-black absolute inset-0 bg-gradient-to-t from-30% to-transparent" />
              <Skeleton className="absolute top-5 right-5 size-7 rounded-md md:top-10 md:right-10 md:size-8" />
            </div>
          </div>

          {/* metadata */}
          <div className="z-2 mx-auto w-full max-w-7xl -translate-y-20 p-3 text-center md:-translate-y-50 md:p-10 lg:-translate-y-100">
            <div className="flex justify-center">
              <Skeleton className="my-5 h-14 w-56 rounded-lg md:h-24 md:w-96" />
            </div>

            <Skeleton className="mx-auto my-3 h-4 w-52 max-w-[80%] rounded-full" />

            <div className="mb-2 flex flex-wrap items-center justify-center gap-2">
              {GENRE_WIDTHS.map((width, index) => (
                <Skeleton key={index} className={cn("h-7 rounded-sm", width)} />
              ))}
            </div>

            <Skeleton className="mx-auto my-2 h-8 w-52 rounded-sm" />

            <div className="mx-auto mb-5 w-full max-w-4xl space-y-2">
              <Skeleton className="h-4 w-full rounded-full" />
              <Skeleton className="mx-auto h-4 w-11/12 rounded-full" />
              <Skeleton className="mx-auto h-4 w-8/12 rounded-full" />
            </div>

            <div className="mb-5 grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
              {Array.from({ length: 3 }, (_, index) => (
                <Skeleton key={index} className="h-18 rounded-md" />
              ))}
            </div>

            {/* cast rail */}
            <div className="mt-8 mb-5">
              <Skeleton className="mx-auto mb-4 h-7 w-20 rounded-full" />
              <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 6 }, (_, index) => (
                  <div
                    key={index}
                    className="border-logo-white/10 flex w-[130px] flex-shrink-0 flex-col items-center gap-2 rounded-lg border p-4"
                  >
                    <Skeleton className="aspect-square w-full rounded-full" />
                    <Skeleton className="h-3.5 w-20 rounded-full" />
                    <Skeleton className="h-3 w-14 rounded-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* action buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              <Skeleton className="h-10 w-36 rounded-full" />
              <Skeleton className="h-10 w-28 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default VideoDetailsSkeleton;
