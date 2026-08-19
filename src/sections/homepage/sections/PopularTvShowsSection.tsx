import WatchCardContainer from "@/components/WatchCardContainer";
import { getQueryOptions } from "@/query-options/QueryOptions";
import { useQuery } from "@tanstack/react-query";
import HomepageSectionState from "./HomepageSectionState";

const PopularTvShowsSection = () => {
  const query = useQuery(getQueryOptions("tv", "popular"));

  return (
    <HomepageSectionState query={query}>
      {(data) => (
        <section className="relative mb-10">
          <h2 className="mb-5 w-full font-[ClashDisplay] text-[clamp(1.125rem,3vw,1.3rem)] font-medium text-white">
            Popular TV Shows
          </h2>
          <WatchCardContainer data={data} />
        </section>
      )}
    </HomepageSectionState>
  );
};

export default PopularTvShowsSection;
