import Watch from "@/components/Watch";
import { ThreeDMarqueeBG } from "@/components/ThreeDMarqueeBG";
import Hero from "@/components/Hero";
import CategoryNavigation from "@/sections/homepage/CategoryNavigation";

const Homepage = () => {
  return (
    <div className="h-full w-full">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <ThreeDMarqueeBG />
        <div className="absolute flex w-full items-center justify-center">
          <Hero />
        </div>
      </div>

      {/* Movies */}
      <div className="bg-logo-black relative flex min-h-screen w-full flex-col justify-center overflow-hidden p-3 md:p-10">
        <CategoryNavigation />

        <Watch category="popular" type="movie" title_header="Popular Movies" />
        <Watch category="top_rated" type="movie" title_header="Top Rated" />
        <Watch category="now_playing" type="movie" title_header="Now Playing" />
        <Watch category="upcoming" type="movie" title_header="Upcoming" />
      </div>
    </div>
  );
};

export default Homepage;
