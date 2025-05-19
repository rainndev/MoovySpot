import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchMovies = async (page: number) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const baseUrl = import.meta.env.VITE_TMDB_API_BASE_URL;

  try {
    const response = await axios(
      `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`,
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
};

const Movies = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: [`movie${page}`],
    queryFn: () => fetchMovies(page),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  console.log("data", data);
  console.log("page", page);
  return (
    <div className="z-5 h-full max-w-7xl">
      <h1 className="mb-10 font-[ClashDisplay] text-3xl font-semibold text-white">
        Popular Movies
      </h1>
      <div className="grid grid-cols-4 gap-4">
        {data.results.map((movie: any) => (
          <div
            key={movie.id}
            className="bg-logo overflow-hidden rounded-lg p-4"
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
            <p className="text-gray-400">{movie.release_date}</p>
          </div>
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
