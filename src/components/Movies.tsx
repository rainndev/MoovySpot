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

  console.log("data", data);
  console.log("page", page);
  return (
    <div className="z-5 h-full max-w-7xl">
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
              <img
                loading="lazy"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-lg opacity-90 shadow-lg"
              />

              <h2 className="mt-2 text-xl font-medium text-white">
                {movie.title}
              </h2>
              <div className="mt-2 flex items-center justify-between">
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

      <div className="mt-10 flex items-center justify-center">
        <button
          onClick={() => {
            if (page === 1) return;
            setPage((prev) => prev - 1);
            console.log("page", page);
          }}
          className="bg-logo-background text- cursor-pointer rounded-lg px-10 py-2"
        >
          Previous
        </button>

        <button
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
          className="bg-logo-background ml-2 cursor-pointer rounded-lg px-10 py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Movies;
