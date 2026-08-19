import Disclaimer from "./Disclaimer";
import PopularTvShowsSection from "./sections/PopularTvShowsSection";
import TrendingThisWeekSection from "./sections/TrendingThisWeekSection";
import TrendingTodaySection from "./sections/TrendingTodaySection";

const TvHomepageSections = () => (
  <>
    <TrendingThisWeekSection type="tv" />
    <TrendingTodaySection type="tv" />
    <PopularTvShowsSection />
    <Disclaimer />
  </>
);

export default TvHomepageSections;
