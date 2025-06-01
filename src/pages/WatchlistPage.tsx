import DetailsCardWithTime from "@/components/DetailsCardWithTime";
import { useWatchListStore } from "@/store/WatchListStore";

const WatchlistPage = () => {
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

  return (
    <div className="flex h-dvh w-full flex-col items-center p-3 md:p-10 md:pl-25">
      {/* header */}

      <div className="mt-5 mb-10 w-full">
        <h1 className="font-[ClashDisplay] text-[clamp(1.3rem,3vw,2rem)] font-medium">
          Watch<span className="text-logo-blue">list</span>
        </h1>

        <p className="font-[SansationLight] text-[clamp(.8rem,3vw,1rem)]">
          {watchListLength}
        </p>
      </div>

      {/* content */}
      <div className="h-full w-full">
        <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
          {sortedWatchList.map((movie, i: number) => (
            <DetailsCardWithTime key={i} movie={movie} />
          ))}
        </div>
        <div className="h-20" />
      </div>
    </div>
  );
};

export default WatchlistPage;
