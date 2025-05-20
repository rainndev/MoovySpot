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
  const { genres, title } = data;

  console.log("genres", genres);
  return (
    <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-auto p-10">
      {/* Dotted Background FIRST, behind everything */}
      <div className="bg-logo-blue border-logo-gray absolute top-0 flex h-full w-full items-center justify-center border-b bg-[radial-gradient(rgba(80,79,79,0.5)_1px,#1E1E1E_1px)] bg-[size:10px_10px] opacity-30" />

      {/* vignette effect */}
      <div className="bg-logo-black pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#14c4b4)]" />

      {/* video watch container */}
      <div className="mt-20 flex h-full w-full max-w-7xl flex-col items-center justify-center">
        {/* title */}
        <h1 className="z-2 mb-5 w-full text-start font-[ClashDisplay] text-4xl">
          {title}
        </h1>

        {/* genres */}
        <div className="z-2 mb-5 flex w-full items-center justify-start gap-2">
          {genres.map((genre: Genre, i: number) => (
            <span
              className="bg-logo-blue/15 border-logo-white/10 rounded-sm border px-2 py-1"
              key={i}
            >
              {genre.name}
            </span>
          ))}
        </div>
        {/* video */}
        <div className="border-logo-white/5 shadow-5xl flex aspect-video w-full items-center justify-center rounded-2xl border-3 bg-[#212121] p-10 backdrop-blur-sm">
          <div>test</div>
        </div>
      </div>
    </section>
  );
};

export default WatchMovie;
