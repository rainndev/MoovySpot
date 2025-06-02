import axios from "axios";

const BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const useVideoOptions = (type: string, id: number) => ({
  queryKey: [`${type}-videos-${id}`],
  queryFn: () => {
    return axios
      .get(`${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed to fetch videos");
        }
        return response.data.results.filter(
          (video: any) => video.type === "Trailer",
        );
      })
      .catch((error) => {
        throw new Error(`Error fetching videos: ${error.message}`);
      });
  },
  staleTime: 1000 * 60 * 60 * 24,
  refetchOnWindowFocus: false,
});
