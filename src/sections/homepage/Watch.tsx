import { useQueryOptions } from "@/query-options/QueryOptions";
import { useQuery } from "@tanstack/react-query";
import type { WatchCategory } from "@/types/WatchTypes";
import LoadingAnimation from "@/components/LoadingAnimation";
import WatchCardContainer from "@/components/WatchCardContainer";
import { useWatchTypeStore } from "@/store/WatchTypeStore";

interface Watch {
  category: WatchCategory;
  title_header: string;
}

const Watch = ({ category, title_header }: Watch) => {
  const type = useWatchTypeStore((state) => state.watchType);

  const { data, isLoading, error, isError } = useQuery(
    useQueryOptions(type, category),
  );

  if (isLoading) return <LoadingAnimation />;
  if (isError)
    return <div className="h-full w-full">Error: {error.message}</div>;

  return (
    <div className="relative mb-20 overflow-hidden">
      {/* header */}
      <h1 className="mb-5 w-full font-[ClashDisplay] text-[clamp(1.25rem,3vw,1.875rem)] font-medium text-white md:mb-8">
        {title_header}
      </h1>

      <div className="z-10 h-full w-full">
        <WatchCardContainer data={data} />
      </div>
    </div>
  );
};

export default Watch;
