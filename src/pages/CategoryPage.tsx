import CategoryCard from "@/components/CategoryCard";
import { useGenreOptions } from "@/query-options/QueryGenreOptions";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import type { MediaItem, MediaType } from "@/types/TMDBTypes";
import LoadingAnimation from "@/components/LoadingAnimation";

interface GenreItem {
  id: number;
  name: string;
}

const fetchMovies = async (
  pageParam: number = 1,
  type: MediaType,
  genre?: number,
) => {
  const res = await axios.get(`https://api.themoviedb.org/3/discover/${type}`, {
    params: {
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      page: pageParam,
      with_genres: genre,
    },
  });
  return res.data;
};

const CategoryPage = () => {
  const [selectedGenre, setSelectedGenre] = useState<number>();
  const [selectedType, setSelectedType] = useState<MediaType>("movie");
  const { ref: loadMoreRef, inView } = useInView();

  const { data: GenreList } = useGenreOptions(selectedType);
  const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [`${selectedType}-category-${selectedGenre}`],
      queryFn: ({ pageParam = 1 }) =>
        fetchMovies(pageParam, selectedType, selectedGenre),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    setSelectedGenre(undefined);
  }, [selectedType]);

  return (
    <div className="flex h-dvh w-full flex-col items-center p-3 pb-20 md:p-10 md:pl-25">
      {/* header */}
      <div className="flex w-full flex-col items-center">
        <h1 className="mt-5 mb-2 w-full text-start font-[ClashDisplay] text-[clamp(1.3rem,3vw,2rem)] font-medium">
          Category{" "}
          <span className="text-logo-blue">
            {selectedType === "movie" ? "Movie" : "TV "}
          </span>
        </h1>

        {/* option category */}
        <ul className="text-logo-white hide-scrollbar mb-5 flex w-full snap-x snap-proximity gap-1 overflow-x-scroll md:gap-2 lg:flex-wrap">
          <li
            key={"movie"}
            onClick={() => {
              setSelectedType("movie");
            }}
            className={`${selectedType === "movie" ? "bg-logo-blue text-logo-black drpop-shadow-logo-blue font-semibold drop-shadow-2xl" : "bg-logo-white/10 font-normal"} hover:bg-logo-white/20 cursor-pointer snap-start rounded-full px-4 py-2 text-[clamp(.6rem,3vw,.8rem)] font-normal text-nowrap transition-colors duration-300 ease-in-out`}
          >
            Movie
          </li>
          <li
            key={"tv"}
            onClick={() => {
              setSelectedType("tv");
            }}
            className={`${selectedType === "tv" ? "bg-logo-blue text-logo-black drpop-shadow-logo-blue font-semibold drop-shadow-2xl" : "bg-logo-white/10 font-normal"} hover:bg-logo-white/20 cursor-pointer snap-start rounded-full px-4 py-2 text-[clamp(.6rem,3vw,.8rem)] font-normal text-nowrap transition-colors duration-300 ease-in-out`}
          >
            TV Show
          </li>

          <li
            key={"seperator"}
            className="bg-logo-blue mx-3 my-[2px] rounded-xl px-[1px] md:mx-4"
          ></li>

          {GenreList?.map((genre: GenreItem) => (
            <li
              key={genre.id}
              onClick={() => {
                setSelectedGenre(genre.id);
              }}
              className={`${genre.id === selectedGenre ? "bg-logo-blue text-logo-black drpop-shadow-logo-blue font-semibold drop-shadow-2xl" : "bg-logo-white/10 font-normal"} hover:bg-logo-blue hover:text-logo-black cursor-pointer snap-start rounded-full px-5 py-2 text-center text-[clamp(.6rem,3vw,.8rem)] text-nowrap transition-colors duration-300 ease-in-out`}
            >
              {genre.name}
            </li>
          )) || "No categories available"}
        </ul>
      </div>

      {/* loading state */}
      {isLoading && <LoadingAnimation />}
      {/* movies list */}
      <div className="mt-5 grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.results.map((data: MediaItem) => (
              <CategoryCard
                key={data.id}
                movie={{ ...data, type: selectedType }}
              />
            ))}
          </React.Fragment>
        ))}

        <div className="h-20 w-full" ref={loadMoreRef}></div>
      </div>
    </div>
  );
};

export default CategoryPage;
