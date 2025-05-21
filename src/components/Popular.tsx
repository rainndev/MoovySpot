import { useMoviesQueryOptions } from "@/query-options/QueryOptions";
import { useQuery } from "@tanstack/react-query";

import LoadingAnimation from "./LoadingAnimation";
import PopularList from "./PopularList";

const Popular = () => {
  const { data, isLoading, error, isError } = useQuery(useMoviesQueryOptions());

  if (isLoading) return <LoadingAnimation />;
  if (isError)
    return <div className="h-full w-full">Error: {error.message}</div>;

  return (
    <div className="relative overflow-hidden">
      {/* header */}
      <h1 className="mb-10 w-full font-[ClashDisplay] text-[clamp(1.5rem,3vw,1.875rem)] font-medium text-white">
        Popular Movies
      </h1>
      {/* movies list */}

      <div className="z-10 h-full w-full">
        <PopularList data={data} />
      </div>
    </div>
  );
};

export default Popular;
