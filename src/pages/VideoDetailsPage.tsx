import { useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import LoadingAnimation from "@/components/LoadingAnimation";
import VideoMetadata from "@/sections/VideoDetailsContainer/VideoMetadata";
import { useRecentlyViewStore } from "@/store/RecentlyViewStore";
import { useWatchData } from "@/hooks/use-watch-data";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";

const VideoDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const addRecentlyView = useRecentlyViewStore((state) => state.addWatch);
  const [showTrailer, setShowTrailer] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const MEDIA_TYPE = queryParams.get("type");
  const numericId = Number(id);

  if (!MEDIA_TYPE || !id || isNaN(numericId)) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        Invalid media type or ID. Please check the URL.
      </div>
    );
  }

  const {
    isBookmarked,
    watchData,
    watchTitle,
    watchDate,
    trailerUrl,
    watchTagline,
    watchGenres,
    watchOverview,
    watchEpisodes,
    watchRuntime,
    watchSeasons,
    watchLogoUrl,
    watchBackdropUrl,
    isLoading,
    watchSeasonsData,
    isError,
    error,

    handleAddToWatchlist,
  } = useWatchData(MEDIA_TYPE, numericId);

  console.log("trailer url", trailerUrl);
  const metaData = useMemo(
    () => ({
      watchGenres,
      watchOverview,
      watchRuntime,
      watchTagline,
      watchLogoUrl,
      watchEpisodes,
      showTrailer,
      setShowTrailer,
      watchTitle,
      MEDIA_TYPE,
      watchSeasonsData,
      numericId,
      watchSeasons,
      handleAddToWatchlist,
      watchDate,
      isBookmarked,
    }),
    [
      watchGenres,
      watchOverview,
      watchRuntime,
      watchTagline,
      watchLogoUrl,
      watchEpisodes,
      watchTitle,
      showTrailer,
      setShowTrailer,
      numericId,
      watchSeasonsData,
      MEDIA_TYPE,
      watchSeasons,
      handleAddToWatchlist,
      watchDate,
      isBookmarked,
    ],
  );

  useEffect(() => {
    if (watchData?.data) {
      addRecentlyView({
        ...watchData.data,
        timeAdded: new Date(),
        type: MEDIA_TYPE,
      });
    }
  }, [watchData?.data]);

  if (isLoading) return <LoadingAnimation />;

  if (isError) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        Error: {error?.message}
      </div>
    );
  }

  return (
    <section className="hide-scrollbar flex h-full w-full justify-center md:pl-25">
      <div className="z-5 w-full">
        <div className="bg-logo-black pointer-events-none absolute inset-0 h-full [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#14c4b4)]" />
        <div className="w-full pb-20">
          <div className="flex w-full flex-col">
            {/* banner poster */}
            <div className="overflow-hidden">
              <div className="relative flex aspect-video h-full w-full items-center justify-center overflow-hidden">
                {showTrailer ? (
                  <iframe
                    src={trailerUrl}
                    title="Trailer"
                    className="fade-in pointer-events-none absolute inset-0 h-[120%] w-full -translate-y-15 opacity-100 transition-opacity duration-300 md:h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img
                    src={watchBackdropUrl}
                    alt="Backdrop"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                )}

                {/* Gradient Overlays */}
                <div className="from-logo-black absolute inset-0 hidden bg-gradient-to-r to-transparent to-40% md:block" />
                <div className="from-logo-black absolute inset-0 bg-gradient-to-t from-30% to-transparent" />
                {showTrailer && (
                  <div className="from-logo-black absolute inset-0 hidden bg-gradient-to-b from-10% to-transparent to-30% md:block" />
                )}

                {/* Bookmark Icon */}
                <div
                  onClick={() => handleAddToWatchlist()}
                  className="absolute top-5 right-5 ml-2 text-2xl md:top-10 md:right-10 md:text-3xl"
                >
                  {isBookmarked ? (
                    <GoBookmarkFill className="text-logo-blue drop-shadow-logo-blue drop-shadow-2xl" />
                  ) : (
                    <GoBookmark className="text-logo-white/90 hover:text-logo-blue transition-colors duration-300" />
                  )}
                </div>
              </div>
            </div>

            <VideoMetadata data={metaData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoDetailsPage;
