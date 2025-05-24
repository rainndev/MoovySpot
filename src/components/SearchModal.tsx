import { useSearchOptions } from "@/query-options/QueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { formatImagePath, formatWatchUrl } from "@/lib/utils";
import { Link } from "react-router-dom";

interface SearchModalProps {
  closeModal: (isOpen: boolean) => void;
}

const SearchModal = ({ closeModal }: SearchModalProps) => {
  const [type, setType] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, error, isError } = useQuery({
    ...useSearchOptions(searchTerm, 1, type),
    enabled: debouncedTerm.length > 0,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    <div className="bg-opacity-50 bg-logo-black/10 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="text-logo-white">Loading...</div>
    </div>;

  if (isError)
    <div className="bg-opacity-50 bg-logo-black/10 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="text-logo-white">Error: {error.message}</div>
    </div>;

  console.log("Search results:", data);

  return (
    <div className="bg-opacity-50 bg-logo-black/10 fixed inset-0 z-50 flex items-center justify-center p-5 backdrop-blur-md">
      {/* Search input container */}
      <div className="bg-logo-black/85 text-md flex w-full max-w-5xl flex-col items-start rounded-xl pb-5 shadow-lg">
        {/* Search icon and input field */}
        <div className="flex w-full items-center p-4 px-5">
          <IoSearch />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            className="ml-5 w-full py-1 focus:ring-0 focus:outline-none"
            placeholder="Search..."
          />
          <div
            onClick={() => closeModal(false)}
            className="text-logo-white/50 hover:text-logo-white ml-2 cursor-pointer text-2xl transition-colors duration-300 ease-in-out"
          >
            <IoIosClose />
          </div>
        </div>
        <div className="bg bg-logo-white/20 h-[1px] w-full" />
        {/* Type */}
        <div className="flex w-full items-center space-x-2 p-5">
          <p
            onClick={() => setType("movie")}
            className={`border-logo-white/20 hover:bg-logo-white/10 ${type === "movie" && "bg-logo-white/10"} rounded-sm border px-5 py-1 text-[clamp(.8rem,3vw,.9rem)] transition-colors duration-300 ease-in-out`}
          >
            Movie
          </p>
          <p
            onClick={() => setType("tv")}
            className={`border-logo-white/20 hover:bg-logo-white/10 ${type === "tv" && "bg-logo-white/10"} rounded-sm border px-5 py-1 text-[clamp(.8rem,3vw,.9rem)] transition-colors duration-300 ease-in-out`}
          >
            TV
          </p>
        </div>
        {/* total result */}
        <p className="text-logo-white/50 px-5 py-2 text-[clamp(.8rem,3vw,1rem)]">
          Total Result: {data ? data.total_results : "0"}
        </p>
        {/* Search results */}
        <div className="hide-scrollbar max-h-[50vh] w-full overflow-y-auto">
          {data && data.results && data.results.length > 0 ? (
            <div className="flex w-full flex-col items-start space-y-2">
              {data.results.map((watch: any) => (
                <Link
                  to={formatWatchUrl(watch.id, watch.media_type || type)}
                  key={watch.id}
                  className="hover:bg-logo-white/10 flex w-full cursor-pointer p-4 px-5 py-2 transition-colors duration-300 ease-in-out"
                >
                  <div className="flex-shrink-0">
                    <img
                      loading="lazy"
                      className="aspect-[10/16] w-25 rounded-md object-cover md:w-30"
                      src={formatImagePath(watch.poster_path, "w300")}
                      alt={watch.original_title}
                    />
                  </div>

                  <div className="flex min-w-0 flex-col items-start justify-center pl-4">
                    {/* title */}
                    <p className="text-logo-white truncate font-[ClashDisplay] text-[clamp(1.125rem,3vw,1.5rem)]">
                      {watch.title || watch.name}
                    </p>
                    <p className="text-logo-white/50 text-sm">
                      {watch.release_date
                        ? new Date(watch.release_date).getFullYear()
                        : watch.first_air_date
                          ? new Date(watch.first_air_date).getFullYear()
                          : "Unknown Year"}
                    </p>
                    <p className="text-logo-white/50 text-sm">
                      Language: {watch.original_language.toUpperCase()}
                    </p>
                    <p className="text-logo-white/50 text-sm">
                      Released date:{" "}
                      {
                        (
                          watch.release_date ||
                          watch.first_air_date ||
                          ""
                        ).split("-")[0]
                      }
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center p-4 px-5">
              <p className="text-logo-white">No results found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
