import TrendingTodayContainer from "@/components/TrendingTodayContainer";
import { getQueryOptions } from "@/query-options/QueryOptions";
import type { MediaType } from "@/types/TMDBTypes";
import { useQuery } from "@tanstack/react-query";
import HomepageSectionState from "./HomepageSectionState";

interface TrendingTodaySectionProps {
  type: MediaType;
}

const TrendingTodaySection = ({ type }: TrendingTodaySectionProps) => {
  const query = useQuery(getQueryOptions(type, "trending_day"));

  return (
    <HomepageSectionState query={query}>
      {(data) => (
        <section className="relative mb-10">
          <h2 className="mb-5 w-full text-center font-[ClashDisplay] text-[clamp(1.125rem,3vw,1.3rem)] font-medium text-white">
            Trending Today
          </h2>
          <TrendingTodayContainer data={data} />
        </section>
      )}
    </HomepageSectionState>
  );
};

export default TrendingTodaySection;
