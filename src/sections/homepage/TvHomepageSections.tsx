import Disclaimer from "./Disclaimer";
import PopularSection from "./sections/PopularSection";
import TrendingThisWeekSection from "./sections/TrendingThisWeekSection";
import TrendingTodaySection from "./sections/TrendingTodaySection";

const TvHomepageSections = () => (
  <>
    <TrendingThisWeekSection type="tv" />
    <TrendingTodaySection type="tv" />
    <PopularSection type="tv" />
    <Disclaimer />
  </>
);

export default TvHomepageSections;
