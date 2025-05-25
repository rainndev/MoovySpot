import WatchCard from "@/components/WatchCard";
import { getTimeAgo } from "@/lib/utils";
import { useRecentlyViewStore } from "@/store/RecentlyViewStore";

const RecentView = () => {
  const recentlyView = useRecentlyViewStore((state) => state.recentlyView);

  const sortedRecentlyView = recentlyView.sort(
    (a, b) => new Date(b.timeAdded).getTime() - new Date(a.timeAdded).getTime(),
  );

  console.log("recentlyWatched", recentlyView);
  console.log(
    "time added",
    recentlyView.map((item) => getTimeAgo(item.timeAdded)),
  );
  return (
    <div className="flex min-h-screen w-full max-w-7xl flex-col justify-center p-3 md:p-10">
      {/* header */}
      <div className="mt-5 mb-10 w-full">
        <h1 className="font-[ClashDisplay] text-[clamp(1.125rem,3vw,3rem)] font-medium">
          Recently <span className="text-logo-blue">Watch</span>
        </h1>
      </div>

      {/* content */}
      <div className="h-full">
        <div className="flex flex-wrap items-center justify-start gap-3 overflow-x-auto px-2 py-5">
          {sortedRecentlyView.map((movie, i: number) => (
            <WatchCard key={i} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentView;
