import { useMoviesByIdOptions } from "@/query-options/QueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface Genre {
  id: number;
  name: string;
}

const WatchMovie = () => {
  const { id } = useParams();

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
    useMoviesByIdOptions(+id),
  );

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="flex h-full w-full items-center justify-center">
        Error: {error.message}
      </div>
    );

  if (!data) return;
  const { genres, title, overview } = data;

  console.log("genres", genres);
  return (
    <section className="hide-scrollbar flex h-full w-full max-w-7xl flex-col items-center justify-center overflow-auto p-5 md:mt-20">
      {/* Dotted Background FIRST, behind everything */}
      <div className="bg-logo-blue border-logo-gray absolute top-0 flex h-full w-full items-center justify-center border-b bg-[radial-gradient(rgba(80,79,79,0.5)_1px,#1E1E1E_1px)] bg-[size:10px_10px] opacity-30" />

      {/* vignette effect */}
      <div className="bg-logo-black pointer-events-none absolute inset-0 flex h-full items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#14c4b4)]" />

      {/* video watch container */}
      <div className="z-2 flex h-full w-full flex-col items-center justify-center not-first:mt-20">
        {/* title */}
        <h1 className="mb-5 w-full text-start font-[ClashDisplay] text-4xl">
          {title}
        </h1>
        {/* genres */}
        <div className="mb-2 flex w-full items-center justify-start gap-2">
          {genres.map((genre: Genre, i: number) => (
            <span
              className="bg-logo-blue/15 border-logo-white/10 rounded-sm border px-2 py-1"
              key={i}
            >
              {genre.name}
            </span>
          ))}
        </div>
        <p className="text-logo-white/85 mb-5 w-full text-start font-[SansationLight] text-base">
          {overview}
        </p>
        {/* video */}
        <div className="border-logo-white/5 shadow-5xl flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border-3 bg-[#212121] backdrop-blur-sm">
          <iframe
            className="h-full w-full rounded-2xl border-0"
            allowFullScreen
            src={`https://player.videasy.net/movie/${id}`}
          ></iframe>
        </div>
      </div>

      {/* Server */}
      <div className="z-2 w-full space-y-2 space-x-2 py-5">
        <p className="bg-logo-white/10 inline-block rounded-sm px-3 py-1">
          Server 1
        </p>
        <p className="bg-logo-white/10 inline-block rounded-sm px-3 py-1">
          Server 2
        </p>
        <p className="bg-logo-white/10 inline-block rounded-sm px-3 py-1">
          Server 2
        </p>
        <p className="bg-logo-white/10 inline-block rounded-sm px-3 py-1">
          Server 2
        </p>
      </div>
    </section>
  );
};

export default WatchMovie;
