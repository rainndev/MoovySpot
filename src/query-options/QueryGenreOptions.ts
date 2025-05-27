import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const useGenreOptions = (type: string) =>
  useQuery({
    queryKey: [`${type}-genres`],
    queryFn: () => {
      return axios
        .get(`${BASE_URL}/genre/${type}/list?api_key=${API_KEY}&language=en-US`)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Failed to fetch genres");
          }
          return response.data.genres;
        })
        .catch((error) => {
          throw new Error(`Error fetching genres: ${error.message}`);
        });
    },
    staleTime: 1000 * 60 * 60 * 24,
  });
