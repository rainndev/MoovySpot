import WatchCardContainer from "@/components/WatchCardContainer";
import { getQueryOptions } from "@/query-options/QueryOptions";
import { useQuery } from "@tanstack/react-query";
import HomepageSectionState from "./HomepageSectionState";

const PopularMoviesSection = () => {
  const query = useQuery(getQueryOptions("movie", "popular"));

  return (
    <HomepageSectionState query={query}>
      {(data) => (
        <section className="relative mb-10">
          <h2 className="mb-5 w-full font-[ClashDisplay] text-[clamp(1.125rem,3vw,1.3rem)] font-medium text-white">
            Popular Movies
          </h2>
          <WatchCardContainer data={data} />
        </section>
      )}
    </HomepageSectionState>
  );
};

export default PopularMoviesSection;
