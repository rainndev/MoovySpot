import { useMoviesQueryOptions } from "@/query-options/QueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Movies = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isError } = useQuery(
    useMoviesQueryOptions(page),
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div className="h-full w-full">Error: {error.message}</div>;

  return (
    <div className="relative">
      {/* background */}
      <div className="bg-logo-blue/50 absolute top-200 left-0 h-[1000px] w-[300px] -rotate-45 rounded-full blur-[200px]" />
      <div className="bg-logo-blue/50 absolute right-0 bottom-20 h-[700px] w-[700px] -rotate-45 rounded-full blur-[200px]" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl">
        <h1 className="mb-10 font-[ClashDisplay] text-[clamp(1.5rem,3vw,1.875rem)] font-semibold text-white">
          Popular Movies
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {data.results.map((movie: any) => (
            <Link to={`/watch/${movie.id}`} key={movie.id}>
              <div
                key={movie.id}
                className="group bg-logo overflow-hidden sm:p-2 md:p-3"
              >
                <div className="border-logo-white/10 w-full overflow-hidden rounded-xl border-4">
                  <img
                    loading="lazy"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="hover: scale-100 rounded-xl object-cover opacity-90 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-50"
                  />
                </div>

                <h2 className="mt-3 text-[clamp(1.2rem,3vw,1.25rem)] font-medium text-white">
                  {movie.title}
                </h2>
                <div className="mt-1 mb-4 flex items-center justify-between text-[clamp(.9rem,3vw,1rem)]">
                  <p className="text-gray-400">
                    {movie.release_date.split("-")[0]}
                  </p>
                  <div className="flex items-center text-yellow-400">
                    <FaStar />
                    <p className="ml-2">{movie.vote_average}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center text-[clamp(.8rem,3vw,1rem)]">
          <button
            onClick={() => {
              if (page === 1) return;
              setPage((prev) => prev - 1);
              console.log("page", page);
            }}
            className="bg-logo-white/10 cursor-pointer rounded-lg px-10 py-2"
          >
            Previous
          </button>

          <button
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
            className="bg-logo-white/10 ml-2 cursor-pointer rounded-lg px-10 py-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Movies;
