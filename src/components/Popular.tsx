import { useQueryOptions } from "@/query-options/QueryOptions";
import { useQuery } from "@tanstack/react-query";

import LoadingAnimation from "./LoadingAnimation";
import PopularList from "./PopularList";

interface PopularProps {
  type: "movie" | "tv";
  title_header: string;
}

const Popular = ({ type, title_header }: PopularProps) => {
  const { data, isLoading, error, isError } = useQuery(useQueryOptions(type));

  if (isLoading) return <LoadingAnimation />;
  if (isError)
    return <div className="h-full w-full">Error: {error.message}</div>;

  return (
    <div className="relative overflow-hidden">
      {/* header */}
      <h1 className="mb-10 w-full font-[ClashDisplay] text-[clamp(1.5rem,3vw,1.875rem)] font-medium text-white">
        {title_header}
      </h1>
      {/* popular movies list */}

      <div className="z-10 h-full w-full">
        <PopularList data={data} type={type} />
      </div>
    </div>
  );
};

export default Popular;
