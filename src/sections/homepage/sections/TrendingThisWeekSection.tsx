import TrendingWatchContainer from "@/components/TrendingWatchContainer";
import { getQueryOptions } from "@/query-options/QueryOptions";
import type { MediaType } from "@/types/TMDBTypes";
import { useQuery } from "@tanstack/react-query";
import HomepageSectionState from "./HomepageSectionState";

interface TrendingThisWeekSectionProps {
  type: MediaType;
}

const TrendingThisWeekSection = ({ type }: TrendingThisWeekSectionProps) => {
  const query = useQuery(getQueryOptions(type, "trending_week"));

  return (
    <HomepageSectionState query={query}>
      {(data) => (
        <section className="relative mb-10">
          <h2 className="mb-5 w-full text-center font-[ClashDisplay] text-[clamp(1.125rem,3vw,1.3rem)] font-medium text-white">
            Trending This Week
          </h2>
          <TrendingWatchContainer data={data} />
        </section>
      )}
    </HomepageSectionState>
  );
};

export default TrendingThisWeekSection;
