import axios from "axios";

const BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const useSeasonOptions = (season_number: number, id: number) => ({
  queryKey: [`${season_number}-${id}-seasons`],
  queryFn: () => {
    return axios
      .get(
        `${BASE_URL}/tv/${id}/season/${season_number}?api_key=${API_KEY}&language=en-US`,
      )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed to fetch season details");
        }
        return response.data;
      })
      .catch((error) => {
        throw new Error(`Error fetching season details: ${error.message}`);
      });
  },
  staleTime: 1000 * 60 * 60 * 24,
});
