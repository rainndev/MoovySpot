import {
  useOptionsById as optionsById,
  useOptionsImages as optionsImages,
} from "@/query-options/QueryOptions";
import { useVideoOptions as videosOptions } from "@/query-options/QueryVideoOptions";
import type { MediaType } from "@/types/TMDBTypes";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

/**
 * Warms exactly the queries the detail page reads (`useWatchData`), so hovering
 * a card makes the next navigation paint straight from cache. They're cached for
 * 24h, so repeat hovers cost nothing.
 *
 * The option builders in `query-options` are plain config factories — only their
 * names start with "use". They're aliased here so the rules-of-hooks lint doesn't
 * mistake a prefetch callback for a hook context.
 */
export const usePrefetchMedia = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (id: number, type: MediaType) => {
      if (!Number.isFinite(id) || id <= 0) return;

      void queryClient.prefetchQuery(optionsById(type, id));
      void queryClient.prefetchQuery(optionsImages(type, id));
      void queryClient.prefetchQuery(videosOptions(type, id));
    },
    [queryClient],
  );
};
