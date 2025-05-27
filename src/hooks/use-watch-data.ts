import { formatImagePath, getLogoUrl } from "@/lib/watch-utils";
import { useOptionsById, useOptionsImages } from "@/query-options/QueryOptions";
import { useWatchListStore } from "@/store/WatchListStore";
import { useQueries } from "@tanstack/react-query";
import { toast } from "sonner";

export const useWatchData = (MEDIA_TYPE: string, id: number) => {
  const isBookmarked = useWatchListStore((state) => state.isExistWatch(+id));
  const addWatchList = useWatchListStore((state) => state.addWatchList);
  const removeWatchList = useWatchListStore((state) => state.removeWatchList);

  const queries = useQueries({
    queries: [useOptionsById(MEDIA_TYPE, id), useOptionsImages(MEDIA_TYPE, id)],
  });

  const [watchData, watchImage] = queries;

  const isLoading = watchData.isLoading || watchImage.isLoading;
  const isError = watchData.isError || watchImage.isError;
  const error = watchData.error || watchImage.error;

  const data = watchData.data;

  const releaseDate = data?.release_date || data?.first_air_date;
  const watchTagline = data?.tagline || "No tagline available";
  const watchDate = releaseDate
    ? new Date(releaseDate).getFullYear()
    : "Unknown Year";

  //genres, overview, runtime, number_of_episodes, number_of_seasons

  const watchGenres = data?.genres || [];
  const watchOverview = data?.overview || "No overview available";
  const watchRuntime = data?.runtime || data?.episode_run_time;
  const watchEpisodes = data?.number_of_episodes;
  const watchSeasons = data?.number_of_seasons;
  const watchLogoUrl = watchImage.data ? getLogoUrl(watchImage.data, "en") : "";

  const watchBackdropUrl = data?.backdrop_path
    ? formatImagePath(data.backdrop_path, "original")
    : "";

  const watchTitle = data?.title || data?.name || "Untitled";

  const handleAddToWatchlist = () => {
    if (!isBookmarked) {
      const timeAdded = new Date();
      if (data) {
        addWatchList({ ...data, timeAdded, type: MEDIA_TYPE });
        toast(`Added to Watchlist`, {
          description: `${watchTitle} is now in your watchlist.`,
          position: "top-right",
        });
      }
    } else {
      removeWatchList(+id);
      toast(`Removed from Watchlist`, {
        description: `${watchTitle} has been removed from your watchlist.`,
        position: "top-right",
      });
    }
  };

  return {
    isBookmarked,
    isLoading,
    isError,
    error,
    watchTitle,
    watchData,
    watchBackdropUrl,
    watchGenres,
    watchOverview,
    watchRuntime,
    watchEpisodes,
    watchLogoUrl,
    watchSeasons,
    watchDate,
    releaseDate,
    watchTagline,
    handleAddToWatchlist,
  };
};
