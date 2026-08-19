import Disclaimer from "./Disclaimer";
import PopularSection from "./sections/PopularSection";
import TrendingThisWeekSection from "./sections/TrendingThisWeekSection";
import TrendingTodaySection from "./sections/TrendingTodaySection";

const MovieHomepageSections = () => (
  <>
    <TrendingThisWeekSection type="movie" />
    <TrendingTodaySection type="movie" />
    <PopularSection type="movie" />
    <Disclaimer />
  </>
);

export default MovieHomepageSections;
