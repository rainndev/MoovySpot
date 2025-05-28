import { useEffect, useState, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import LoadingAnimation from "@/components/LoadingAnimation";
import VideoMetadata from "@/components/VideoMetadata";
import { useRecentlyViewStore } from "@/store/RecentlyViewStore";
import { serverUrlOption } from "@/data/server-data";
import { useWatchData } from "@/hooks/use-watch-data";

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
    if (serverOptions.length) setServer(serverOptions[1]);
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
    <section className="hide-scrollbar flex h-full w-full max-w-7xl items-center justify-center p-5 md:pl-25">
      <img
        src={watchBackdropUrl}
        className="absolute inset-0 h-full w-full object-cover opacity-30 blur-xs"
        alt=""
      />
      <div className="bg-logo-blue absolute inset-0 h-full w-full bg-[radial-gradient(rgba(80,79,79,0.5)_1px,#1E1E1E_1px)] bg-[size:10px_10px] opacity-15" />
      <div className="bg-logo-black absolute inset-0 h-full [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#14c4b4)]" />

      <div className="z-2 w-full">
        <div className="my-20 flex h-full w-full flex-col">
          <VideoMetadata data={metaData} />

          <div className="border-logo-white/5 shadow-5xl bg-logo-black/50 aspect-video w-full overflow-hidden rounded-2xl border-3 backdrop-blur-sm">
            <iframe
              className="h-full w-full"
              allowFullScreen
              frameBorder="0"
              src={server}
            />
          </div>

          <div className="z-2 my-3 w-full space-y-2 space-x-2">
            {serverOptions.map((option, i) => (
              <p
                key={i}
                onClick={() => setServer(option)}
                className="bg-logo-white/10 hover:bg-logo-blue/20 active:bg-logo-blue/20 inline-block cursor-pointer rounded-sm px-5 py-2 text-[clamp(.8rem,3vw,1rem)]"
              >
                Server {i + 1}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WatchVideoContainer;
