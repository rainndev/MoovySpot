import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseUrl = import.meta.env.VITE_TMDB_API_BASE_URL;

const fetchMovies = async (type: string = "movie", page: number = 1) => {
  try {
    const response = await axios(
      `${baseUrl}/${type}/popular?api_key=${apiKey}&language=en-US&page=${page}`,
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
};

//for movies query
export const useQueryOptions = (type: string, page?: number) => ({
  queryKey: [`${type}-${page}`],
  queryFn: () => fetchMovies(type, page),
});

//for watch movie query
const watchById = async (type: string = "movie", id: number) => {
  try {
    const response = await axios(
      `${baseUrl}/${type}/${id}?api_key=${apiKey}&language=en-US`,
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
};

//for watch movie query
export const useOptionsById = (type: string, id: number) => ({
  queryKey: [`movie-${id}`],
  queryFn: () => watchById(type, id),
});
