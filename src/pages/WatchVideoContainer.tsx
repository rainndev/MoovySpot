import LoadingAnimation from "@/components/LoadingAnimation";
import { formatRuntime } from "@/lib/utils";
import { useOptionsById } from "@/query-options/QueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";

interface Genre {
  id: number;
  name: string;
}

const WatchVideoContainer = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type");

  if (!typeParam)
    return (
      <div className="flex h-fit w-full items-center justify-center">
        Error: No type provided
      </div>
    );

  const serverOptions = [
    `https://player.videasy.net/${typeParam}/`,
    `https://vidsrc.cc/v2/embed/${typeParam}/`,
    `https://vidsrc.net/embed/${typeParam}/`,
  ];

  const [server, setServer] = useState(
    `https://vidsrc.cc/v2/embed/${typeParam}/${id}`,
  );

  if (!id)
    return (
      <div className="flex h-full w-full items-center justify-center">
        Error: No ID provided
      </div>
    );

  if (isNaN(+id))
    return (
      <div className="flex h-full w-full items-center justify-center">
        Error: Invalid ID
      </div>
    );

  const { data, isLoading, error, isError } = useQuery(
    useOptionsById(typeParam, +id),
  );

  if (isLoading) return <LoadingAnimation />;

  if (isError)
    return (
      <div className="flex h-full w-full items-center justify-center">
        Error: {error.message}
      </div>
    );

  if (!data) return;
  const { genres, overview, runtime, tagline } = data;

  // show date
  const date =
    typeParam === "movie"
      ? data.release_date.split("-")[0]
      : data.first_air_date.split("-")[0];

  console.log("data", data);

  console.log(
    "backdrop",
    `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`,
  );

  return (
    <section className="hide-scrollbar flex h-full w-full max-w-7xl items-center justify-center p-5">
      <img
        src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
        className="absolute inset-0 h-full w-full object-cover opacity-30 blur-xs"
        alt=""
      />

      {/* Dotted Background FIRST, behind everything */}
      <div className="bg-logo-blue absolute inset-0 h-full w-full bg-[radial-gradient(rgba(80,79,79,0.5)_1px,#1E1E1E_1px)] bg-[size:10px_10px] opacity-30" />

      {/* vignette effect */}
      <div className="bg-logo-black absolute inset-0 h-full [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#14c4b4)]" />

      {/* video watch container */}
      <div className="z-2 w-full">
        <div className="my-20 flex h-full w-full flex-col">
          {/* tagline */}
          <p className="text-logo-white/90 mb-1 w-full text-start font-[SansationLight] text-[clamp(.7rem,3vw,.9rem)] italic">
            {tagline && `"${tagline}"`}
          </p>

          {/* title */}
          <h1 className="text-logo-white mb-2 w-full text-start font-[ClashDisplay] text-[clamp(1.8rem,3vw,8rem)] font-medium">
            {typeParam === "movie" ? data.title : data.name}
          </h1>
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
              <span>
                <CiCalendarDate />
              </span>
              <span>{date}</span>
            </p>

            <p className="flex items-center gap-2">
              <span>
                <IoMdTime />
              </span>
              <span>{formatRuntime(runtime)}</span>
            </p>
          </div>
          {/* overview */}
          <p className="text-logo-white/90 mb-5 w-full text-start font-[SansationLight] text-[clamp(.9rem,3vw,1rem)]">
            {overview}
          </p>

          {/* video */}
          <div className="border-logo-white/5 shadow-5xl aspect-video w-full overflow-hidden rounded-2xl border-3 backdrop-blur-sm">
            <iframe
              className="h-full w-full"
              allowFullScreen
              frameBorder="0"
              src={server}
            ></iframe>
          </div>

          {/* Server */}
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
