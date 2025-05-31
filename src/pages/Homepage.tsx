import Watch from "@/sections/homepage/Watch";
import { ThreeDMarqueeBG } from "@/sections/homepage/ThreeDMarqueeBG";
import Hero from "@/sections/homepage/Hero";
import TypeNavigation from "@/sections/homepage/TypeNavigation";
import { useWatchTypeStore } from "@/store/WatchTypeStore";
import { useQueries } from "@tanstack/react-query";
import { useQueryOptions } from "@/query-options/QueryOptions";
import LoadingAnimation from "@/components/LoadingAnimation";
import Disclaimer from "@/sections/homepage/Disclaimer";
import { watchData } from "@/data/homepage-data";

const HomePage = () => {
  const type = useWatchTypeStore((state) => state.watchType);

  const queriesOptions = watchData[type].map((data) => {
    return useQueryOptions(type, data.category);
  });

  const data = useQueries({
    queries: queriesOptions,
  });

  //check if any query is loading or has an error
  if (data.some((query) => query.isLoading)) return <LoadingAnimation />;
  if (data.find((query) => query.isError))
    return <div className="h-full w-full">Error: {data[0].error?.message}</div>;

  return (
    <div className="h-dvh">
      <div className="relative flex h-dvh w-full items-center justify-center">
        <ThreeDMarqueeBG />

        {/* Background */}
        <div className="from-logo-black to-logo-black/10 pointer-events-none absolute inset-0 bg-gradient-to-t" />

        {/* Hero */}
        <div className="absolute flex w-full items-center justify-center">
          <Hero />
        </div>
      </div>

      <div className="bg-logo-black relative flex min-h-full w-full flex-col justify-center p-3 md:p-10 md:pl-20">
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
        <Disclaimer />
      </div>
    </div>
  );
};

export default HomePage;
