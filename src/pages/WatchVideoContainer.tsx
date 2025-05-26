import LoadingAnimation from "@/components/LoadingAnimation";
import { formatImagePath, formatRuntime } from "@/lib/utils";
import { useOptionsById, useOptionsImages } from "@/query-options/QueryOptions";
import { useQueries } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { useEffect, useState } from "react";
import { useRecentlyViewStore } from "@/store/RecentlyViewStore";

interface Genre {
  id: number;
  name: string;
}

const WatchVideoContainer = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type");
  const [server, setServer] = useState("");

  useEffect(() => {
    setServer(`https://player.videasy.net/${typeParam}/${id}`);
  }, [typeParam, id]);

  const addRecentlyView = useRecentlyViewStore((state) => state.addWatch);

  // Error conditions shown *after* hooks
  if (!typeParam)
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        Error: No type provided
      </div>
    );
  if (!id)
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        Error: No ID provided
      </div>
    );
  if (isNaN(+id))
    return (
      <div className="min-h-screenw-full flex items-center justify-center">
        Error: Invalid ID
      </div>
    );

  // Fetch movie/show data
  const queries = useQueries({
    queries: [useOptionsById(typeParam, +id), useOptionsImages(typeParam, +id)],
  });

  // Add to recently viewed store
  useEffect(() => {
    const timeAdded = new Date();
    queries[0].data && addRecentlyView({ ...queries[0].data, timeAdded });
  }, [queries[0].data]);

  const [watchData, watchImage] = queries;

  if (watchData.isLoading || watchImage.isLoading) return <LoadingAnimation />;

  if (watchData.isError)
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        Error: {watchData.error.message}
      </div>
    );
  if (!watchData.data || !watchImage.data) return null;

  // Destructure movie/show data
  const {
    genres,
    overview,
    runtime,
    tagline,
    backdrop_path,
    release_date,
    first_air_date,
    number_of_episodes,
    number_of_seasons,
  } = watchData.data;

  //date
  const fallBackDate = release_date || first_air_date;

  const date = fallBackDate
    ? new Date(fallBackDate).getFullYear()
    : "Unknown Year";

  // title
  const title = watchData.data.title || watchData.data.name;

  // backdrop
  const backdropUrl = formatImagePath(backdrop_path, "original");

  // Load logo if available
  let logoUrl = "";

  if (watchImage.data.logos.length > 0) {
    const englishLogo = watchImage.data.logos.find(
      (logo: any) => logo.iso_639_1 === "en" && logo.width <= 500,
    );

    if (englishLogo) {
      logoUrl = formatImagePath(englishLogo.file_path, "original");
    } else {
      logoUrl = formatImagePath(watchImage.data.logos[0].file_path, "original");
    }
  }

  // Video server options
  const serverOptions = [
    `https://player.videasy.net/${typeParam}/`,
    `https://vidsrc.cc/v2/embed/${typeParam}/`,
    `https://vidsrc.net/embed/${typeParam}/`,
    `https://vidsrc.xyz/embed/${typeParam}/`,
    `https://vidsrc.io/embed/${typeParam}/`,
  ];

  return (
    <section className="hide-scrollbar flex h-full w-full max-w-7xl items-center justify-center p-5">
      <img
        src={backdropUrl}
        className="absolute inset-0 h-full w-full object-cover opacity-30 blur-xs"
        alt=""
      />
      <div className="bg-logo-blue absolute inset-0 h-full w-full bg-[radial-gradient(rgba(80,79,79,0.5)_1px,#1E1E1E_1px)] bg-[size:10px_10px] opacity-15" />
      <div className="bg-logo-black absolute inset-0 h-full [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#14c4b4)]" />

      <div className="z-2 w-full">
        <div className="my-20 flex h-full w-full flex-col">
          {/* title */}
          {logoUrl ? (
            <img
              src={logoUrl}
              className={`drop-shadow-logo-black/50 w-full max-w-[400px] object-cover py-5 drop-shadow-2xl`}
              alt={title}
            />
          ) : (
            <h1 className="text-logo-white mb-2 w-full text-start font-[ClashDisplay] text-[clamp(1.8rem,3vw,8rem)] font-medium">
              {title}
            </h1>
          )}

          {/* tagline */}
          <p className="text-logo-white/90 my-2 w-full text-start font-[SansationLight] text-[clamp(.7rem,3vw,.9rem)] italic">
            {tagline && `"${tagline}"`}
          </p>

          {/* genres */}
          <div className="mb-2 flex w-full flex-wrap items-center justify-start gap-2 text-[clamp(.8rem,3vw,1rem)]">
            {genres.map((genre: Genre, i: number) => (
              <span
                className="bg-logo-blue/15 border-logo-white/10 inline-block rounded-sm border px-2 py-1"
                key={i}
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* year and runtime */}
          <div className="my-2 flex space-x-3 border-y border-y-white/30 p-2 text-[clamp(.8rem,3vw,1rem)]">
            <p className="flex items-center gap-2">
              <CiCalendarDate />
              <span>{date}</span>
            </p>
            <div className="bg-logo-white/30 w-[1px]" />

            {runtime ? (
              <p className="flex items-center gap-2">
                <IoMdTime />
                <span>{formatRuntime(runtime)}</span>
              </p>
            ) : (
              <div className="flex flex-wrap items-center space-x-2">
                <p className="inline-flex items-center gap-1">
                  Episodes: <span className="ml-2">{number_of_episodes}</span>
                </p>

                <p className="inline-flex items-center gap-1">
                  Seasons: <span className="ml-2">{number_of_seasons}</span>
                </p>
              </div>
            )}
          </div>

          {/* overview */}
          <p className="text-logo-white/90 mb-5 w-full text-start font-[SansationLight] text-[clamp(.9rem,3vw,1rem)]">
            {overview}
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
                onClick={() => setServer(`${option}${id}`)}
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
