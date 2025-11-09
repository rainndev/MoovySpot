import { useEffect, useState } from "react";
import LoadingAnimation from "@/components/LoadingAnimation";
import VideoMetadata from "@/sections/VideoDetailsContainer/VideoMetadata";
import { useRecentlyViewStore } from "@/store/RecentlyViewStore";
import { useWatchData } from "@/hooks/use-watch-data";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { motion } from "framer-motion";
import TrailerVideo from "@/components/TrailerVideo";
import ReactPlayer from "react-player";
import type { VideoDetailsPageType } from "@/routes/details.$id.lazy";

interface VideoDetailsPageProps {
  id: string;
  searchParams: VideoDetailsPageType;
}

const VideoDetailsPage = ({ id, searchParams }: VideoDetailsPageProps) => {
  const addRecentlyView = useRecentlyViewStore((state) => state.addWatch);
  const [showTrailer, setShowTrailer] = useState(false);
  const MEDIA_TYPE = searchParams.type;
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
    collection_id,
    watchBackdropUrl,
    isLoading,
    watchSeasonsData,
    isError,
    error,

    handleAddToWatchlist,
  } = useWatchData(MEDIA_TYPE, numericId);

  const isTrailerPlayble = ReactPlayer.canPlay(trailerUrl);
  // console.log("collection parts ----------", collection_data.data?.parts);
  // console.log("collection title ----------", collection_data.data?.name);

  const metaData = {
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
    isTrailerPlayble,
    watchSeasonsData,
    numericId,
    collection_id,
    watchSeasons,
    handleAddToWatchlist,
    watchDate,
    isBookmarked,
  };

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
                  <TrailerVideo
                    trailerUrl={trailerUrl}
                    setShowTrailer={setShowTrailer}
                  />
                ) : (
                  <motion.img
                    data-testid="trailer-banner"
                    initial={{ opacity: 0, scale: 1.05 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src={watchBackdropUrl}
                    alt="Backdrop"
                    className={`${watchBackdropUrl ? "absolute" : "hidden"} inset-0 h-full w-full object-cover object-center transition-opacity duration-300`}
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
                  data-testid="favorite-button"
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
