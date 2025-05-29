import TrendingWatchContainer from "@/components/TrendingWatchContainer";
import WatchCardContainer from "@/components/WatchCardContainer";

interface Watch {
  data: any;
  title_header: string;
}

const Watch = ({ data, title_header }: Watch) => {
  const isTrending = title_header === "Trending This Week";

  return (
    <div className="relative mb-10">
      {/* header */}
      <h1 className="mb-5 w-full font-[ClashDisplay] text-[clamp(1.125rem,3vw,1.3rem)] font-medium text-white">
        {title_header}
      </h1>

      <div className="z-10 h-full w-full">
        {isTrending ? (
          <TrendingWatchContainer data={data} />
        ) : (
          <WatchCardContainer data={data} />
        )}
      </div>
    </div>
  );
};

export default Watch;
