import Watch from "@/components/Watch";
import { ThreeDMarqueeBG } from "@/components/ThreeDMarqueeBG";
import Hero from "@/components/Hero";
import TypeNavigation from "@/sections/homepage/TypeNavigation";

const Homepage = () => {
  return (
    <div className="h-dvh w-full">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <ThreeDMarqueeBG />
        <div className="absolute flex w-full items-center justify-center">
          <Hero />
        </div>
      </div>

      {/* Movies */}
      <div className="bg-logo-black relative flex min-h-full w-full flex-col justify-center p-3 md:p-10">
        <TypeNavigation />

        <Watch category="popular" type="movie" title_header="Popular Movies" />
        <Watch category="top_rated" type="movie" title_header="Top Rated" />
        <Watch category="now_playing" type="movie" title_header="Now Playing" />
        <Watch category="upcoming" type="movie" title_header="Upcoming" />
      </div>
    </div>
  );
};

export default Homepage;
