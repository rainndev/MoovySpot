import ErrorUI from "@/components/ErrorUI";
import type { MediaResponse } from "@/types/TMDBTypes";
import type { UseQueryResult } from "@tanstack/react-query";
import type { ReactNode } from "react";
import HomepageSectionSkeleton, {
  type HomepageSkeletonVariant,
} from "./HomepageSectionSkeleton";

interface HomepageSectionStateProps {
  query: UseQueryResult<MediaResponse, Error>;
  skeleton: HomepageSkeletonVariant;
  children: (data: MediaResponse) => ReactNode;
}

const HomepageSectionState = ({
  query,
  skeleton,
  children,
}: HomepageSectionStateProps) => {
  if (query.isPending) {
    return <HomepageSectionSkeleton variant={skeleton} />;
  }

  if (query.isError) {
    return (
      <ErrorUI
        error={query.error.message}
        onRetry={() => query.refetch()}
        fullHeight={false}
      />
    );
  }

  return children(query.data);
};

export default HomepageSectionState;
