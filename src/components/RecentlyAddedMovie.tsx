import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const RecentlyAddedMovie = () => {
  const URL = "https://vidsrc.xyz/movies/latest/page-1.json";

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["recentlyAddedMovies"],
    queryFn: () => axios.get(URL).then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (!data || !data.result) {
    return <div>No recently added movies found.</div>;
  }

  console.log("Recently Added Movies:", data);
  return <div></div>;
};

export default RecentlyAddedMovie;
