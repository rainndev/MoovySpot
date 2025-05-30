import type { WatchCategory } from "../types/WatchTypes";

import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseUrl = import.meta.env.VITE_TMDB_API_BASE_URL;

const fetchData = async (
  type: string = "movie",
  category: WatchCategory,
  page: number = 1,
) => {
  try {
    const fetchUrl =
      category === "trending_week" || category === "trending_day"
        ? `${baseUrl}/trending/${type}/${category.split("_")[1]}`
        : `${baseUrl}/${type}/${category}`;

    const response = await axios(
      `${fetchUrl}?api_key=${apiKey}&language=en-US&page=${page}`,
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
};

//for movies query
export const useQueryOptions = (
  type: string,
  category: WatchCategory,
  page: number = 1,
) => ({
  queryKey: [`${category}-${type}-${page}`],
  queryFn: () => fetchData(type, category, page),
  staleTime: 1000 * 60 * 60 * 24,
  refetchOnWindowFocus: false,
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
  queryKey: [`${type}-${id}`],
  queryFn: () => watchById(type, id),
  staleTime: 1000 * 60 * 60 * 24,
  refetchOnWindowFocus: false,
});

//for watch query images

export const useOptionsImages = (type: string, id: number) => ({
  queryKey: [`${type}-images-${id}`],
  queryFn: () =>
    axios(`${baseUrl}/${type}/${id}/images?api_key=${apiKey}`).then(
      (res) => res.data,
    ),
  staleTime: 1000 * 60 * 60 * 24,
  refetchOnWindowFocus: false,
});

//for search query
export const useSearchOptions = (
  query: string,
  page: number = 1,
  type: string,
) => ({
  queryKey: [`${type}-${query}-${page}`],
  queryFn: () =>
    axios(
      `${baseUrl}/search/${type}?api_key=${apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`,
    ).then((res) => res.data),
  keepPreviousData: true,
});
