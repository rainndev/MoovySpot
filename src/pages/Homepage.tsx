import Watch from "@/components/Watch";
import { ThreeDMarqueeBG } from "@/components/ThreeDMarqueeBG";
import Hero from "@/components/Hero";
import TypeNavigation from "@/sections/homepage/TypeNavigation";
import { useWatchTypeStore } from "@/store/WatchTypeStore";
import type { WatchCategory } from "@/types/WatchTypes";

const Homepage = () => {
  const type = useWatchTypeStore((state) => state.watchType);

  const watchData: Record<
    "movie" | "tv",
    { category: WatchCategory; title: string }[]
  > = {
    movie: [
      { category: "popular", title: "Popular Movies" },
      { category: "top_rated", title: "Top Rated" },
      { category: "now_playing", title: "Now Playing" },
      { category: "upcoming", title: "Upcoming" },
    ],

    tv: [
      { category: "popular", title: "Popular TV Shows" },
      { category: "top_rated", title: "Top Rated" },
      { category: "on_the_air", title: "On The Air" },
      { category: "airing_today", title: "Airing Today" },
    ],
  };

  console.log("Watch Type:", type);
  console.log("Watch Data:", watchData[type]);

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

        {watchData[type].map((data) => (
          <Watch
            key={data.category}
            category={data.category}
            title_header={data.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
