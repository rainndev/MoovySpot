import { useWatchListStore } from "@/store/WatchListStore";

const Watchlist = () => {
  const data = useWatchListStore((state) => state.watchList);

  console.log("Watchlist data:", data);
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      Watch list
    </div>
  );
};

export default Watchlist;
