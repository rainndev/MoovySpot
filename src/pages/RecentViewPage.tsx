import DetailsCardWithTime from "@/components/DetailsCardWithTime";
import { useRecentlyViewStore } from "@/store/RecentlyViewStore";

const RecentViewPage = () => {
  const recentlyView = useRecentlyViewStore((state) => state.recentlyView);
  // const clearRecentlyView = useRecentlyViewStore(
  //   (state) => state.clearRecentlyView,
  // );
  const sortedRecentlyView = recentlyView.sort(
    (a, b) => new Date(b.timeAdded).getTime() - new Date(a.timeAdded).getTime(),
  );

  const isRecentlyViewEmpty = recentlyView.length === 0;

  if (isRecentlyViewEmpty) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <h1 className="text-logo-white/50 px-5 text-center font-[ClashDisplay] text-[clamp(1rem,3vw,1.125rem)]">
          No recently viewed movies/shows
        </h1>
      </div>
    );
  }
  console.log("recentlyWatched", recentlyView);

  return (
    <div className="flex h-dvh w-full flex-col items-center p-3 pb-20 md:p-10 md:pl-25">
      {/* header */}
      <div className="mt-5 mb-10 w-full">
        <h1 className="font-[ClashDisplay] text-[clamp(1.3rem,3vw,2rem)] font-medium">
          Recently <span className="text-logo-blue">Viewed</span>
        </h1>
      </div>

      {/* content */}
      <div className="h-full w-full">
        <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
          {sortedRecentlyView.map((movie, i: number) => (
            <DetailsCardWithTime key={i} movie={movie} />
          ))}
        </div>

        <div className="h-20" />
      </div>
    </div>
  );
};

export default RecentViewPage;
