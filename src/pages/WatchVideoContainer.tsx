import LoadingAnimation from "@/components/LoadingAnimation";
import { formatRuntime } from "@/lib/watch-utils";
import { useParams } from "react-router-dom";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { useEffect, useState } from "react";
import { useRecentlyViewStore } from "@/store/RecentlyViewStore";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { serverUrlOption } from "@/data/server-data";
import { useLocation } from "react-router-dom";
import { useWatchData } from "@/hooks/use-watch-data";

interface Genre {
  id: number;
  name: string;
}

const WatchVideoContainer = () => {
  const { id } = useParams();
  const [server, setServer] = useState("");
  const addRecentlyView = useRecentlyViewStore((state) => state.addWatch);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const MEDIA_TYPE = queryParams.get("type");

  const serverOptions = serverUrlOption.map(
    (option) => `${option}${MEDIA_TYPE}/${id}`,
  );

  useEffect(() => {
    setServer(`${serverOptions[0]}`);
  }, [MEDIA_TYPE, id]);
  console.log("server url--------", server);
  // Error conditions shown *after* hooks
  if (!MEDIA_TYPE || !id || isNaN(+id))
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        Invalid media type or ID. Please check the URL.
      </div>
    );

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
  } = useWatchData(MEDIA_TYPE, +id);

  console.log("watchData", watchData.data);
  // Add to recently viewed store
  useEffect(() => {
    const timeAdded = new Date();
    watchData.data &&
      addRecentlyView({ ...watchData.data, timeAdded, type: MEDIA_TYPE });
  }, [watchData.data]);

  if (isLoading) return <LoadingAnimation />;

  if (isError)
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        Error: {error?.message}
      </div>
    );

  return (
    <section className="hide-scrollbar flex h-full w-full max-w-7xl items-center justify-center p-5">
      <img
        src={watchBackdropUrl}
        className="absolute inset-0 h-full w-full object-cover opacity-30 blur-xs"
        alt=""
      />

      <div className="bg-logo-blue absolute inset-0 h-full w-full bg-[radial-gradient(rgba(80,79,79,0.5)_1px,#1E1E1E_1px)] bg-[size:10px_10px] opacity-15" />
      <div className="bg-logo-black absolute inset-0 h-full [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#14c4b4)]" />

      <div className="z-2 w-full">
        <div className="my-20 flex h-full w-full flex-col">
          {/* title */}

          <div>
            {watchLogoUrl ? (
              <img
                src={watchLogoUrl}
                className={`drop-shadow-logo-black/50 w-full max-w-[400px] object-cover py-5 drop-shadow-2xl`}
                alt={watchTitle}
              />
            ) : (
              <h1 className="text-logo-white mb-2 w-full text-start font-[ClashDisplay] text-[clamp(1.8rem,3vw,8rem)] font-medium">
                {watchTitle}
              </h1>
            )}
          </div>

          {/* tagline */}
          <p className="text-logo-white/90 my-2 w-full text-start font-[SansationLight] text-[clamp(.7rem,3vw,.9rem)] italic">
            {watchTagline}
          </p>

          {/* genres */}
          <div className="mb-2 flex w-full flex-wrap items-center justify-start gap-2 text-[clamp(.8rem,3vw,1rem)]">
            {watchGenres.map((genre: Genre, i: number) => (
              <span
                className="bg-logo-blue/15 border-logo-white/10 inline-block rounded-sm border px-2 py-1"
                key={i}
              >
                {genre.name}
              </span>
            ))}

            <div
              onClick={() => handleAddToWatchlist()}
              className="ml-2 text-2xl"
            >
              {isBookmarked ? (
                <GoBookmarkFill className="text-logo-blue" />
              ) : (
                <GoBookmark className="text-logo-white/90 hover:text-logo-blue transition-colors duration-300" />
              )}
            </div>
          </div>

          {/* year and runtime */}
          <div className="my-2 flex space-x-3 border-y border-y-white/30 p-2 text-[clamp(.8rem,3vw,1rem)]">
            <p className="flex items-center gap-2">
              <CiCalendarDate />
              <span>{watchDate}</span>
            </p>
            <div className="bg-logo-white/30 w-[1px]" />

            {watchRuntime ? (
              <p className="flex items-center gap-2">
                <IoMdTime />
                <span>{formatRuntime(watchRuntime)}</span>
              </p>
            ) : (
              <div className="flex flex-wrap items-center space-x-2">
                <p className="inline-flex items-center gap-1">
                  Episodes: <span className="ml-2">{watchEpisodes}</span>
                </p>

                <p className="inline-flex items-center gap-1">
                  Seasons: <span className="ml-2">{watchSeasons}</span>
                </p>
              </div>
            )}
          </div>

          {/* overview */}
          <p className="text-logo-white/90 mb-5 w-full text-start font-[SansationLight] text-[clamp(.9rem,3vw,1rem)]">
            {watchOverview || "No overview available."}
          </p>

          {/* video */}
          <div className="border-logo-white/5 shadow-5xl bg-logo-black/50 aspect-video w-full overflow-hidden rounded-2xl border-3 backdrop-blur-sm">
            <iframe
              className="h-full w-full"
              allowFullScreen
              frameBorder="0"
              src={server}
            ></iframe>
          </div>

          {/* Server selection */}
          <div className="z-2 my-3 w-full space-y-2 space-x-2">
            {serverOptions.map((option, i) => (
              <p
                key={i}
                onClick={() => setServer(`${option}`)}
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
