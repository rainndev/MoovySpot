import Disclaimer from "./Disclaimer";
import PopularMoviesSection from "./sections/PopularMoviesSection";
import TrendingThisWeekSection from "./sections/TrendingThisWeekSection";
import TrendingTodaySection from "./sections/TrendingTodaySection";

const MovieHomepageSections = () => (
  <>
    <TrendingThisWeekSection type="movie" />
    <TrendingTodaySection type="movie" />
    <PopularMoviesSection />
    <Disclaimer />
  </>
);

export default MovieHomepageSections;
