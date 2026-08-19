import WatchCardContainer from "@/components/WatchCardContainer";
import { getQueryOptions } from "@/query-options/QueryOptions";
import type { MediaType } from "@/types/TMDBTypes";
import { useQuery } from "@tanstack/react-query";
import HomepageSectionState from "./HomepageSectionState";

interface PopularSectionProps {
  type: MediaType;
}

const sectionTitles: Record<MediaType, string> = {
  movie: "Popular Movies",
  tv: "Popular TV Shows",
};

const PopularSection = ({ type }: PopularSectionProps) => {
  const query = useQuery(getQueryOptions(type, "popular"));

  return (
    <HomepageSectionState query={query}>
      {(data) => (
        <section className="relative mb-10">
          <h2 className="mb-5 w-full font-[ClashDisplay] text-[clamp(1.125rem,3vw,1.3rem)] font-medium text-white">
            {sectionTitles[type]}
          </h2>
          <WatchCardContainer data={data} />
        </section>
      )}
    </HomepageSectionState>
  );
};

export default PopularSection;
