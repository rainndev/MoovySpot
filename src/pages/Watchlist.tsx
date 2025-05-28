import RecentViewCard from "@/components/RecentViewCard";
import { useWatchListStore } from "@/store/WatchListStore";

const Watchlist = () => {
  const watchList = useWatchListStore((state) => state.watchList);
  // const clearRecentlyView = useRecentlyViewStore(
  //   (state) => state.clearRecentlyView,
  // );
  const sortedWatchList = watchList.sort(
    (a, b) => new Date(b.timeAdded).getTime() - new Date(a.timeAdded).getTime(),
  );

  const isWatchListEmpty = watchList.length === 0;
  const watchListLength =
    watchList.length >= 2
      ? `${watchList.length} items`
      : `${watchList.length} item`;

  if (isWatchListEmpty) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <h1 className="text-logo-white/50 px-5 text-center font-[ClashDisplay] text-[clamp(1rem,3vw,1.125rem)]">
          Please add movies/shows to your watchlist
        </h1>
      </div>
    );
  }
  console.log("recentlyWatched", watchList);

  return (
    <div className="flex h-dvh w-full max-w-7xl flex-col items-center p-3 pb-20 md:p-10">
      {/* header */}

      <div className="mt-5 mb-10 w-full">
        <h1 className="font-[ClashDisplay] text-[clamp(1.125rem,3vw,2rem)] font-medium">
          Watch<span className="text-logo-blue">list</span>
        </h1>

        <p className="font-[SansationLight] text-[clamp(.8rem,3vw,1rem)]">
          {watchListLength}
        </p>
      </div>

      {/* content */}
      <div className="h-full">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {sortedWatchList.map((movie, i: number) => (
            <RecentViewCard key={i} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
