import { useEffect, useState, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import LoadingAnimation from "@/components/LoadingAnimation";
import VideoMetadata from "@/components/VideoMetadata";
import { useRecentlyViewStore } from "@/store/RecentlyViewStore";
import { serverUrlOption } from "@/data/server-data";
import { useWatchData } from "@/hooks/use-watch-data";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";

const WatchVideoContainer = () => {
  const { id } = useParams();
  const location = useLocation();
  const addRecentlyView = useRecentlyViewStore((state) => state.addWatch);

  const queryParams = new URLSearchParams(location.search);
  const MEDIA_TYPE = queryParams.get("type");

  const numericId = Number(id);

  const serverOptions = useMemo(() => {
    return serverUrlOption.map(
      (option) => `${option.baseUrl}${MEDIA_TYPE}/${id}${option.extraParams}`,
    );
  }, [MEDIA_TYPE, id]);

  const [server, setServer] = useState("");

  console.log("server---------------------", server);

  useEffect(() => {
    if (serverOptions.length) setServer(serverOptions[0]);
  }, [serverOptions]);

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
    watchTagline,
    watchGenres,
    watchOverview,
    watchEpisodes,
    watchRuntime,
    watchSeasons,
    watchLogoUrl,
    watchBackdropUrl,
    isLoading,
    isError,
    error,

    handleAddToWatchlist,
  } = useWatchData(MEDIA_TYPE, numericId);

  const metaData = useMemo(
    () => ({
      watchGenres,
      watchOverview,
      watchRuntime,
      watchTagline,
      watchLogoUrl,
      watchEpisodes,
      watchTitle,
      MEDIA_TYPE,
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
      numericId,
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
          <div className="flex h-full w-full flex-col">
            {/* banner poster */}
            <div
              className="relative aspect-video h-50 sm:h-80 md:h-100 lg:h-150"
              style={{
                backgroundImage: `
                linear-gradient(to right, var(--color-logo-black) 1%, rgba(0, 0, 0, 0) 80%),
                linear-gradient(to top, var(--color-logo-black) 1%, rgba(0, 0, 0, 0) 100%),
                url('${watchBackdropUrl}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
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
            <VideoMetadata data={metaData} />
            {/* <div className="border-logo-white/5 shadow-5xl bg-logo-black/50 aspect-video w-full overflow-hidden rounded-2xl border-3 backdrop-blur-sm">
              <iframe
                className="h-full w-full"
                allowFullScreen
                frameBorder="0"
                src={server}
              />
            </div> */}

            {/* <div className="z-2 my-3 w-full space-y-2 space-x-2">
              {serverOptions.map((option, i) => (
                <p
                  key={i}
                  onClick={() => setServer(option)}
                  className="bg-logo-white/10 hover:bg-logo-blue/20 active:bg-logo-blue/20 inline-block cursor-pointer rounded-sm px-5 py-2 text-[clamp(.8rem,3vw,1rem)]"
                >
                  Server {i + 1}
                </p>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WatchVideoContainer;
