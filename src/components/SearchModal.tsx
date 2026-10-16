import { usePrefetchMedia } from "@/hooks/use-prefetch-media";
import { cn } from "@/lib/utils";
import { formatImagePath } from "@/lib/watch-utils";
import { useGenreOptions } from "@/query-options/QueryGenreOptions";
import { useSearchOptions } from "@/query-options/QueryOptions";
import { useSearchModalStore } from "@/store/SearchModalStore";
import type { MediaItem, MediaType } from "@/types/TMDBTypes";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpDown,
  LayoutGrid,
  List,
  LoaderCircle,
  Search,
  SearchX,
  Star,
  TriangleAlert,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import MediaPosterCard from "./MediaPosterCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type SortKey =
  | "relevance"
  | "popularity"
  | "rating"
  | "newest"
  | "oldest"
  | "title";

type ViewMode = "list" | "grid";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "popularity", label: "Popularity" },
  { value: "rating", label: "Rating" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "title", label: "Title (A–Z)" },
];

const mediaKind = (item: MediaItem): MediaType =>
  item.title || item.release_date ? "movie" : "tv";

const displayTitle = (item: MediaItem) => item.title || item.name || "Untitled";

const releaseTime = (item: MediaItem) => {
  const date = item.release_date || item.first_air_date;
  const time = date ? new Date(date).getTime() : 0;
  return Number.isFinite(time) ? time : 0;
};

const yearOf = (item: MediaItem) => {
  const released = releaseTime(item);
  return released ? new Date(released).getFullYear() : null;
};

const StateMessage = ({
  icon,
  title,
  hint,
}: {
  icon: ReactNode;
  title: string;
  hint?: string;
}) => (
  <div className="text-logo-white/40 flex h-full min-h-[13rem] flex-col items-center justify-center gap-2 px-6 text-center">
    <span className="text-logo-white/25">{icon}</span>
    <p className="text-logo-white/60 text-[clamp(.85rem,3vw,.95rem)]">
      {title}
    </p>
    {hint && <p className="text-[clamp(.72rem,2.6vw,.82rem)]">{hint}</p>}
  </div>
);

const SearchResultRow = ({
  item,
  genres,
  onSelect,
  onPrefetch,
}: {
  item: MediaItem;
  genres: string[];
  onSelect: () => void;
  onPrefetch: (id: number, type: MediaType) => void;
}) => {
  const kind = mediaKind(item);
  const title = displayTitle(item);
  const year = yearOf(item);
  const rating = item.vote_average ?? 0;

  return (
    <Link
      to="/details/$id"
      params={{ id: String(item.id) }}
      search={{ type: kind }}
      onClick={onSelect}
      onMouseEnter={() => onPrefetch(item.id, kind)}
      onFocus={() => onPrefetch(item.id, kind)}
      className="hover:bg-logo-white/5 focus-visible:bg-logo-white/5 flex w-full items-start gap-3 rounded-lg p-2 transition-colors"
    >
      <div className="relative shrink-0">
        <div className="bg-logo-white/5 aspect-[2/3] w-12 overflow-hidden rounded-lg sm:w-14">
          {item.poster_path ? (
            <img
              src={formatImagePath(item.poster_path, "w300")}
              alt={title}
              loading="lazy"
              draggable={false}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-logo-white/25 flex h-full w-full items-center justify-center text-[0.6rem]">
              N/A
            </div>
          )}
        </div>
        {year && (
          <span className="border-logo-white/10 text-logo-white/80 bg-logo-black/80 absolute -top-1.5 -right-1.5 rounded-full border px-2 py-0.5 text-[0.6rem] font-semibold backdrop-blur-sm">
            {year}
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 items-start justify-between gap-3 py-0.5">
        <div className="min-w-0">
          <p
            data-testid="search-result-title"
            className="text-logo-white truncate font-[ClashDisplay] text-[clamp(.95rem,3.4vw,1.05rem)] font-medium"
          >
            {title}
          </p>
          {genres.length > 0 && (
            <p className="text-logo-white/45 mt-1 flex flex-wrap items-center gap-x-1.5 text-[clamp(.68rem,2.6vw,.78rem)]">
              {genres.map((genre, index) => (
                <span key={genre} className="flex items-center">
                  {index > 0 && (
                    <span className="mr-1.5" aria-hidden="true">
                      •
                    </span>
                  )}
                  {genre}
                </span>
              ))}
            </p>
          )}
        </div>

        {rating > 0 && (
          <span className="text-logo-blue mt-0.5 flex shrink-0 items-center gap-1 text-[clamp(.68rem,2.6vw,.78rem)]">
            <Star className="size-3 fill-current" aria-hidden="true" />
            {rating.toFixed(1)}
          </span>
        )}
      </div>
    </Link>
  );
};

const SearchModal = () => {
  const toggleModal = useSearchModalStore((state) => state.toggleModal);
  const [type, setType] = useState<MediaType>("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [view, setView] = useState<ViewMode>("list");
  const [sort, setSort] = useState<SortKey>("relevance");
  const inputRef = useRef<HTMLInputElement>(null);
  const prefetchMedia = usePrefetchMedia();
  const { data: movieGenres } = useGenreOptions("movie");
  const { data: tvGenres } = useGenreOptions("tv");

  useEffect(() => {
    const timer = window.setTimeout(
      () => setDebouncedTerm(searchTerm.trim()),
      300,
    );
    return () => window.clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") toggleModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleModal]);

  const { data, isFetching, isError, error } = useQuery({
    ...useSearchOptions(debouncedTerm, 1, type),
    enabled: debouncedTerm.length > 0,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  const results = useMemo(() => {
    const items: MediaItem[] = data?.results ?? [];
    // Never sort in place: React Compiler memoizes render values, so mutating a
    // shared array can leave a previous sort order stuck in the cache.
    const sorted = (compare: (a: MediaItem, b: MediaItem) => number) =>
      [...items].sort(compare);

    switch (sort) {
      case "popularity":
        return sorted((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
      case "rating":
        return sorted((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0));
      case "newest":
        return sorted((a, b) => releaseTime(b) - releaseTime(a));
      case "oldest":
        return sorted((a, b) => releaseTime(a) - releaseTime(b));
      case "title":
        return sorted((a, b) => displayTitle(a).localeCompare(displayTitle(b)));
      case "relevance":
      default:
        return items;
    }
  }, [data, sort]);

  const genreNames = useMemo(() => {
    const toMap = (genres?: { id: number; name: string }[]) =>
      new Map((genres ?? []).map((genre) => [genre.id, genre.name]));
    return { movie: toMap(movieGenres), tv: toMap(tvGenres) };
  }, [movieGenres, tvGenres]);

  // Search results only carry genre ids, so resolve the first couple to names.
  const genresFor = (item: MediaItem) =>
    (item.genre_ids ?? [])
      .map((id) => genreNames[mediaKind(item)].get(id))
      .filter((name): name is string => Boolean(name))
      .slice(0, 2);

  const hasTerm = debouncedTerm.length > 0;
  const showLoading = hasTerm && !data && isFetching;
  const showEmpty =
    hasTerm && Boolean(data) && !isFetching && results.length === 0;
  const total = data?.total_results ?? 0;
  const activeSort =
    SORT_OPTIONS.find((option) => option.value === sort)?.label ?? "Relevance";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) toggleModal();
      }}
      className="bg-logo-black/70 fixed inset-0 z-100 flex items-start justify-center p-3 backdrop-blur-md sm:items-center sm:p-6"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Search movies and TV shows"
        initial={{ opacity: 0, y: -12, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.99 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-logo-black/90 border-logo-white/10 flex h-[min(88dvh,46rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border shadow-2xl shadow-black/50"
      >
        {/* search field */}
        <div className="flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4">
          <Search
            className="text-logo-white/40 size-4 shrink-0"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            type="text"
            placeholder="Search..."
            className="text-logo-white placeholder:text-logo-white/40 min-w-0 flex-1 bg-transparent text-[clamp(.85rem,3vw,1rem)] focus:outline-none"
          />
          {searchTerm && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearchTerm("")}
              className="text-logo-white/40 hover:text-logo-white shrink-0 rounded-md p-1 transition-colors"
            >
              <X className="size-4" />
            </button>
          )}
          <span
            className="bg-logo-white/10 h-5 w-px shrink-0"
            aria-hidden="true"
          />
          <button
            type="button"
            data-testid="close-search-button"
            aria-label="Close search"
            onClick={() => toggleModal()}
            className="text-logo-white/40 hover:text-logo-white shrink-0 rounded-md p-1 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* toolbar */}
        <div className="border-logo-white/10 flex flex-wrap items-center justify-between gap-2 border-t px-4 py-2.5 sm:px-5">
          <div
            role="group"
            aria-label="Content type"
            className="border-logo-white/10 bg-logo-white/5 flex items-center rounded-lg border p-0.5"
          >
            {(["movie", "tv"] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={type === value}
                onClick={() => setType(value)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-[clamp(.72rem,2.8vw,.82rem)] transition-colors",
                  type === value
                    ? "bg-logo-white/10 text-logo-white"
                    : "text-logo-white/50 hover:text-logo-white",
                )}
              >
                {value === "movie" ? "Movie" : "TV"}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div
              role="group"
              aria-label="View mode"
              className="border-logo-white/10 bg-logo-white/5 flex items-center rounded-lg border p-0.5"
            >
              {(
                [
                  { value: "list", label: "List view", Icon: List },
                  { value: "grid", label: "Grid view", Icon: LayoutGrid },
                ] as const
              ).map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  aria-label={label}
                  aria-pressed={view === value}
                  onClick={() => setView(value)}
                  className={cn(
                    "rounded-md p-1.5 transition-colors",
                    view === value
                      ? "bg-logo-white/10 text-logo-white"
                      : "text-logo-white/50 hover:text-logo-white",
                  )}
                >
                  <Icon className="size-4" />
                </button>
              ))}
            </div>

            <Select
              value={sort}
              onValueChange={(value: string) => setSort(value as SortKey)}
            >
              <SelectTrigger
                aria-label="Sort results"
                data-testid="search-sort"
                className="w-[8.5rem] text-[clamp(.72rem,2.8vw,.8rem)] sm:w-[10rem]"
              >
                <ArrowUpDown className="text-logo-white/40" />
                <SelectValue />
              </SelectTrigger>
              {/* Above the modal overlay (z-100); the popper default is z-50. */}
              <SelectContent className="z-[110]">
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* results */}
        <div className="border-logo-white/10 flex min-h-0 flex-1 flex-col border-t">
          {hasTerm && data && (
            <div className="text-logo-white/40 flex items-center justify-between px-4 py-2 text-[clamp(.68rem,2.6vw,.78rem)] sm:px-5">
              <span className="flex items-center gap-2">
                <span>
                  {total.toLocaleString()} result{total === 1 ? "" : "s"}
                </span>
                <span className="text-logo-white/25">
                  · Sorted by {activeSort}
                </span>
              </span>
              {isFetching && (
                <LoaderCircle
                  className="size-3.5 animate-spin"
                  aria-label="Updating results"
                />
              )}
            </div>
          )}

          <div className="hide-scrollbar min-h-0 flex-1 overflow-y-auto p-2 sm:p-3">
            {isError ? (
              <StateMessage
                icon={<TriangleAlert className="size-6" />}
                title="Search failed"
                hint={error?.message ?? "Please try again."}
              />
            ) : !hasTerm ? (
              <StateMessage
                icon={<Search className="size-6" />}
                title="Search movies and TV shows"
                hint="Start typing to find a title."
              />
            ) : showLoading ? (
              <StateMessage
                icon={<LoaderCircle className="size-6 animate-spin" />}
                title="Searching..."
              />
            ) : showEmpty ? (
              <StateMessage
                icon={<SearchX className="size-6" />}
                title="No results found"
                hint="Try a different keyword or switch between Movie and TV."
              />
            ) : view === "grid" ? (
              <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4 sm:gap-2 md:grid-cols-5">
                {results.map((item) => {
                  const year = yearOf(item);

                  return (
                    <div
                      key={`${mediaKind(item)}-${item.id}`}
                      onClick={() => toggleModal()}
                    >
                      <MediaPosterCard
                        media={item}
                        type={mediaKind(item)}
                        wrapperClassName="w-full"
                        imageWrapperClassName="aspect-[3/4]"
                        showMissingImage
                        topRightSlot={
                          year ? (
                            <span className="border-logo-white/10 text-logo-white/80 bg-logo-black/80 absolute top-1.5 right-1.5 z-10 rounded-full border px-1.5 py-0.5 text-[0.55rem] font-semibold backdrop-blur-sm">
                              {year}
                            </span>
                          ) : undefined
                        }
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col gap-0.5">
                {results.map((item) => (
                  <SearchResultRow
                    key={`${mediaKind(item)}-${item.id}`}
                    item={item}
                    genres={genresFor(item)}
                    onSelect={() => toggleModal()}
                    onPrefetch={prefetchMedia}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchModal;
