import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseUrl = import.meta.env.VITE_TMDB_API_BASE_URL;

const fetchMovies = async (page: number) => {
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

//for watch movie query
const watchById = async (id: number) => {
  try {
    const response = await axios(
      `${baseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`,
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
};

//for watch movie query
export const useMoviesByIdOptions = (id: number) => ({
  queryKey: [`movie-${id}`],
  queryFn: () => watchById(id),
});
