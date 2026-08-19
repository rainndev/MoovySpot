import ErrorUI from "@/components/ErrorUI";
import type { MediaResponse } from "@/types/TMDBTypes";
import type { UseQueryResult } from "@tanstack/react-query";
import type { ReactNode } from "react";

interface HomepageSectionStateProps {
  query: UseQueryResult<MediaResponse, Error>;
  children: (data: MediaResponse) => ReactNode;
}

const HomepageSectionState = ({
  query,
  children,
}: HomepageSectionStateProps) => {
  if (query.isPending) {
    return (
      <div className="flex min-h-48 w-full items-center justify-center gap-2">
        {Array.from({ length: 3 }, (_, index) => (
          <span
            key={index}
            className="bg-logo-blue h-2 w-2 animate-pulse rounded-full"
            style={{ animationDelay: `${index * 120}ms` }}
          />
        ))}
      </div>
    );
  }

  if (query.isError) {
    return <ErrorUI error={query.error.message} onRetry={() => query.refetch()} fullHeight={false} />;
  }

  return children(query.data);
};

export default HomepageSectionState;
