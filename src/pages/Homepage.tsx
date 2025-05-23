import Watch from "@/sections/homepage/Watch";
import { ThreeDMarqueeBG } from "@/sections/homepage/ThreeDMarqueeBG";
import Hero from "@/sections/homepage/Hero";
import TypeNavigation from "@/sections/homepage/TypeNavigation";
import { useWatchTypeStore } from "@/store/WatchTypeStore";
import type { WatchCategory } from "@/types/WatchTypes";
import { useQueries } from "@tanstack/react-query";
import { useQueryOptions } from "@/query-options/QueryOptions";
import LoadingAnimation from "@/components/LoadingAnimation";

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

  const queriesOptions = watchData[type].map((data) => {
    return useQueryOptions(type, data.category);
  });

  const data = useQueries({
    queries: queriesOptions,
  });

  if (
    data[0].isLoading ||
    data[1].isLoading ||
    data[2].isLoading ||
    data[3].isLoading
  )
    return <LoadingAnimation />;
  if (data[0].isError || data[1].isError || data[2].isError || data[3].isError)
    return <div className="h-full w-full">Error: {data[0].error?.message}</div>;

  return (
    <div className="h-dvh w-full">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <ThreeDMarqueeBG />

        {/* Background */}
        <div className="from-logo-black to-logo-black/10 absolute inset-0 z-0 bg-gradient-to-t" />

        {/* Hero */}
        <div className="absolute flex w-full items-center justify-center">
          <Hero />
        </div>
      </div>

      <div className="bg-logo-black relative flex min-h-full w-full flex-col justify-center p-3 md:p-10">
        {/* Type Navigation */}
        <TypeNavigation />

        {/* content */}
        {data.map((item, i) => (
          <Watch
            key={i}
            data={item.data}
            title_header={watchData[type][i].title}
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
