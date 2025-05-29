import axios from "axios";

const BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const useCreditsOptions = (type: string, id: number) => ({
  queryKey: [`${type}-${id}-credits`],
  queryFn: () => {
    return axios
      .get(
        `${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}&language=en-US`,
      )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed to fetch credits");
        }
        return response.data.cast;
      })
      .catch((error) => {
        throw new Error(`Error fetching credits: ${error.message}`);
      });
  },
  staleTime: 1000 * 60 * 60 * 24,
});
