import WatchCard from "@/components/WatchCard";
import { getTimeAgo } from "@/lib/utils";
import { useRecentlyViewStore } from "@/store/RecentlyViewStore";

const RecentView = () => {
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
        <h1 className="text-logo-white/50 font-[ClashDisplay] text-[clamp(1rem,3vw,1.125rem)]">
          No recently viewed movies/shows
        </h1>
      </div>
    );
  }
  console.log("recentlyWatched", recentlyView);
  console.log(
    "time added",
    recentlyView.map((item) => getTimeAgo(item.timeAdded)),
  );
  return (
    <div className="flex min-h-screen w-full max-w-7xl flex-col items-center p-3 pb-20 md:p-10">
      {/* header */}
      <div className="mt-5 mb-10 w-full">
        <h1 className="font-[ClashDisplay] text-[clamp(1.125rem,3vw,3rem)] font-medium">
          Recently <span className="text-logo-blue">Viewed</span>
        </h1>
      </div>
      {/* <button onClick={() => clearRecentlyView()}>Clear</button> */}

      {/* content */}
      <div className="h-full">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {sortedRecentlyView.map((movie, i: number) => (
            <WatchCard key={i} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentView;
