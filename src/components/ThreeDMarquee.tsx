"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";

interface Movie {
  poster_path: string;
}

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

export function ThreeDMarqueeBG() {
  const [page1, page2] = useQueries({
    queries: [
      {
        queryKey: [`movie1`],
        queryFn: () => fetchMovies(1),
      },
      {
        queryKey: [`movie2`],
        queryFn: () => fetchMovies(2),
      },
    ],
  });

  if (page1.isLoading && page2.isLoading) return <div>Loading...</div>;

  // merge page1 and page2 data
  const movieData = [...page1.data?.results, ...page2.data?.results];

  const images: string[] = movieData.map(
    (movie: Movie) => `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  );

  return (
    <div className="h-full">
      <ThreeDMarquee images={images} />
    </div>
  );
}
