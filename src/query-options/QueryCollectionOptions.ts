import axios from "axios";

const BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const useCollectionOptions = (id: number | null) => ({
  queryKey: [`${id}-collection`],
  queryFn: () => {
    return axios
      .get(`${BASE_URL}/collection/${id}?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed to fetch collection");
        }
        return response.data;
      })
      .catch((error) => {
        throw new Error(`Error fetching collection: ${error.message}`);
      });
  },
});
