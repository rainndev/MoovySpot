import axios from "axios";

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

//for movies query
export const useMoviesQueryOptions = (page: number) => ({
  queryKey: [`movie${page}`],
  queryFn: () => fetchMovies(page),
});
