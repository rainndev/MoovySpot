import ErrorUI from "@/components/ErrorUI";
import LoadingAnimation from "@/components/LoadingAnimation";
import { watchData } from "@/data/homepage-data";
import { useQueryOptions } from "@/query-options/QueryOptions";
import Disclaimer from "@/sections/homepage/Disclaimer";
import Hero from "@/sections/homepage/Hero";
import { ThreeDMarqueeBG } from "@/sections/homepage/ThreeDMarqueeBG";
import TypeNavigation from "@/sections/homepage/TypeNavigation";
import Watch from "@/sections/homepage/Watch";
import { useWatchTypeStore } from "@/store/WatchTypeStore";
import { useQueries } from "@tanstack/react-query";

const HomePage = () => {
  const type = useWatchTypeStore((state) => state.watchType);

  const queriesOptions = watchData[type].map((data) => {
    return useQueryOptions(type, data.category);
  });

  const data = useQueries({
    queries: queriesOptions,
  });

  const handleRetry = () => {
    data.forEach((query) => query.refetch());
  };

  //check if any query is loading or has an error
  if (data.some((query) => query.isLoading)) return <LoadingAnimation />;
  if (data.find((query) => query.isError))
    return (
      <ErrorUI
        error={data.find((query) => query.isError)?.error?.message}
        onRetry={handleRetry}
      />
    );

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
