import HeroPage from "@/sections/homepage/HeroPage";
import MovieHomepageSections from "@/sections/homepage/MovieHomepageSections";
import TypeNavigation from "@/sections/homepage/TypeNavigation";
import TvHomepageSections from "@/sections/homepage/TvHomepageSections";
import { useWatchTypeStore } from "@/store/WatchTypeStore";

const homepageSections = {
  movie: MovieHomepageSections,
  tv: TvHomepageSections,
};

const HomePage = () => {
  const type = useWatchTypeStore((state) => state.watchType);
  const HomepageSections = homepageSections[type];

  return (
    <div className="h-dvh">
      <HeroPage />

      <div className="bg-logo-black relative flex min-h-full w-full flex-col justify-center p-3 md:p-10 md:pl-20">
        <TypeNavigation />
        <HomepageSections />
      </div>
    </div>
  );
};

export default HomePage;
