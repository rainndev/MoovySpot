import TrendingTodayContainer from "@/components/TrendingTodayContainer";
import TrendingWatchContainer from "@/components/TrendingWatchContainer";
import WatchCardContainer from "@/components/WatchCardContainer";

interface Watch {
  data: any;
  title_header: string;
}

const Watch = ({ data, title_header }: Watch) => {
  const isTrendingWeek = title_header === "Trending This Week";
  const isTrendingToday = title_header === "Trending Today";

  return (
    <div className="relative mb-10">
      {/* header */}
      <h1
        className={`mb-10 w-full font-[ClashDisplay] text-[clamp(1.125rem,3vw,1.3rem)] font-medium text-white ${
          isTrendingWeek || isTrendingToday ? "text-center" : ""
        }`}
      >
        {title_header}
      </h1>

      <div className="z-10 h-full w-full">
        {isTrendingWeek ? (
          <TrendingWatchContainer data={data} />
        ) : isTrendingToday ? (
          <TrendingTodayContainer data={data} />
        ) : (
          <WatchCardContainer data={data} />
        )}
      </div>
    </div>
  );
};

export default Watch;
