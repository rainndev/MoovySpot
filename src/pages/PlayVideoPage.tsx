import EpisodeCard from "@/components/EpisodeCard";
import LoadingAnimation from "@/components/LoadingAnimation";
import { serverUrlOption } from "@/data/server-data";
import { useWatchData } from "@/hooks/use-watch-data";
import { formatImagePath } from "@/lib/watch-utils";
import { useCollectionOptions } from "@/query-options/QueryCollectionOptions";
import { useSimilarOptions } from "@/query-options/QueryOptions";
import { useSeasonOptions } from "@/query-options/QuerySeasonOptions";
import type { PlaySearch } from "@/routes/play.$id";
import type { MediaItem } from "@/types/TMDBTypes";
import type { Episode, SeasonInfo } from "@/types/TvSeriesTypes";
import { useQueries } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { FaServer } from "react-icons/fa6";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CiCalendarDate } from "react-icons/ci";

interface PlayVideoPageProps {
  id: string;
  searchParams: PlaySearch;
}

const PlayVideoPage = ({ id, searchParams }: PlayVideoPageProps) => {
  const navigate = useNavigate();
  const MEDIA_TYPE = searchParams.type;
  const isMovie = MEDIA_TYPE === "movie";
  const isTv = MEDIA_TYPE === "tv";
  const numericId = Number(id);
  const resolvedId = Number.isFinite(numericId) ? numericId : 0;
  const [server, setServer] = useState("");

  const {
    collection_id,
    isLoading,
    isError,
    error,
    watchTitle,
    watchSeasonsData,
  } = useWatchData(MEDIA_TYPE ?? "movie", resolvedId);

  const currentSeason =
    searchParams.season ?? watchSeasonsData[0]?.season_number ?? 1;
  const currentEpisode = searchParams.episode ?? 1;

  const serverOptions = useMemo(() => {
    return serverUrlOption.map((option) => {
      if (isMovie) {
        return option.movieLink.replace("##id##", String(resolvedId));
      }

      return option.tvLink
        .replace("##id##", String(resolvedId))
        .replace("##season##", String(currentSeason))
        .replace("##episode##", String(currentEpisode));
    });
  }, [currentEpisode, currentSeason, isMovie, resolvedId]);

  useEffect(() => {
    if (serverOptions.length > 0) {
      setServer(serverOptions[0]);
    }
  }, [serverOptions]);

  const [seasonQuery, collectionQuery, similarQuery] = useQueries({
    queries: [
      {
        ...useSeasonOptions(currentSeason, resolvedId),
        enabled: isTv && resolvedId > 0,
      },
      {
        ...useCollectionOptions(collection_id),
        enabled: isMovie && collection_id !== null,
      },
      {
        ...useSimilarOptions("movie", resolvedId),
        enabled: isMovie && resolvedId > 0,
      },
    ],
  });

  const seasonData = seasonQuery.data as { episodes?: Episode[] } | undefined;
  const collectionData = collectionQuery.data as
    | { name?: string; parts?: MediaItem[] }
    | undefined;
  const relatedCollectionParts =
    collectionData?.parts?.filter((item) => item.id !== resolvedId) ?? [];
  const similarMovies =
    (similarQuery.data?.results as MediaItem[] | undefined)?.filter(
      (item) => item.id !== resolvedId,
    ) ?? [];
  const hasCollection = relatedCollectionParts.length > 0;
  const upNextMovies = hasCollection ? relatedCollectionParts : similarMovies;
  const upNextTitle = hasCollection
    ? collectionData?.name || "Collection"
    : "Similar Movies";

  const showInvalidState =
    !MEDIA_TYPE ||
    !id ||
    !Number.isFinite(numericId) ||
    serverOptions.length === 0;

  if (isLoading || !server) {
    return <LoadingAnimation />;
  }

  if (showInvalidState) {
    return (
      <div className="flex min-h-dvh w-full items-center justify-center px-5 text-center text-white/70">
        Invalid media type or ID. Please check the URL.
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-dvh w-full items-center justify-center px-5 text-center text-white/70">
        Error: {error?.message}
      </div>
    );
  }

  return (
    <div className="bg-logo-black text-logo-white min-h-dvh w-full p-3 md:p-10 md:pl-25">
      <div className="mx-auto flex w-full flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="text-logo-white/50 text-[clamp(.7rem,2vw,.85rem)] tracking-[0.3em] uppercase">
            Now Playing
          </p>
          <h1 className="font-[ClashDisplay] text-[clamp(1.1rem,3vw,2rem)] font-medium">
            {watchTitle}
          </h1>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.5fr)]">
          <section className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/40">
              <div className="aspect-video w-full">
                <iframe
                  data-testid="play-main-video"
                  className="bg-logo-white/5 h-full w-full"
                  allowFullScreen
                  frameBorder="0"
                  src={server}
                  title={watchTitle}
                />
              </div>
            </div>

            {/* server selection */}
            <div className="flex flex-col gap-3 rounded-2xl border border-white/10 p-4 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-logo-white/50 text-[clamp(.65rem,1vw,0.75rem)] tracking-[0.25em] uppercase">
                  Server
                </p>
                <p className="text-logo-white/80 text-[clamp(0.75rem,1vw,1rem)]">
                  Choose a streaming source
                </p>
              </div>
              <Select
                value={server}
                onValueChange={(value: string) => setServer(value)}
              >
                <SelectTrigger
                  className="w-full md:w-[200px]"
                  data-testid="play-server-select"
                >
                  <FaServer className="text-logo-blue shadow-logo-blue/50 shadow-2xl" />
                  <SelectValue placeholder="Select Server" />
                </SelectTrigger>
                <SelectContent>
                  {serverOptions.map((option, index) => (
                    <SelectItem
                      key={serverUrlOption[index].name}
                      value={option}
                    >
                      {serverUrlOption[index].name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </section>

          <aside
            data-testid="play-up-next"
            className="h-fit rounded-2xl border border-white/10 p-4 backdrop-blur-sm lg:sticky lg:top-4"
          >
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-logo-white/50 text-[clamp(.6rem,1vw,0.65rem)] tracking-[0.32em] uppercase">
                  Up Next
                </p>
                <p
                  data-testid="play-up-next-label"
                  className="text-logo-blue text-[clamp(.6rem,1vw,0.65rem)] tracking-[0.28em] uppercase"
                >
                  {isTv
                    ? "Episodes"
                    : hasCollection
                      ? "Collection"
                      : "Similar Movies"}
                </p>
                <h2
                  data-testid="play-up-next-title"
                  className="mt-5 font-[ClashDisplay] text-[clamp(1rem,2.4vw,1.4rem)] font-medium"
                >
                  {isMovie ? upNextTitle : `Season ${currentSeason}`}
                </h2>
              </div>

              {/* For TV shows, show season selector. For movies, this section is hidden since there's no concept of seasons. */}
              {isTv && (
                <Select
                  value={String(currentSeason)}
                  onValueChange={(value) => {
                    void navigate({
                      to: "/play/$id",
                      params: { id },
                      search: {
                        type: "tv",
                        season: Number(value),
                        episode: 1,
                      },
                    });
                  }}
                >
                  <SelectTrigger
                    className="w-[140px]"
                    data-testid="play-season-select"
                  >
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    {watchSeasonsData.map((season: SeasonInfo) => (
                      <SelectItem
                        key={season.id}
                        value={String(season.season_number)}
                      >
                        {season.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {isTv ? (
              <div className="hide-scrollbar max-h-[calc(100dvh-14rem)] space-y-3 overflow-y-auto pr-1">
                {seasonQuery.isLoading && <LoadingAnimation />}
                {seasonQuery.isError && (
                  <div className="text-logo-white/70 text-sm">
                    Could not load episodes.
                  </div>
                )}
                {seasonData?.episodes?.map((episode: Episode) => {
                  const isActiveEpisode =
                    episode.episode_number === currentEpisode;

                  return (
                    <Link
                      key={episode.id}
                      to="/play/$id"
                      params={{ id }}
                      search={{
                        type: "tv",
                        season: currentSeason,
                        episode: episode.episode_number,
                      }}
                      className={`block rounded-xl border p-1 transition-all duration-300 ${isActiveEpisode ? "border-logo-blue bg-logo-blue/10" : "border-white/10 bg-black/30 hover:bg-white/10"}`}
                    >
                      <EpisodeCard episode={episode} />
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="hide-scrollbar max-h-[calc(100dvh-14rem)] space-y-3 overflow-y-auto pr-1">
                {upNextMovies.length > 0 ? (
                  upNextMovies.map((movie: MediaItem) => {
                    const year = movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : movie.first_air_date
                        ? new Date(movie.first_air_date).getFullYear()
                        : "N/A";
                    const isActiveMovie = movie.id === resolvedId;

                    return (
                      <Link
                        key={movie.id}
                        to="/play/$id"
                        params={{ id: String(movie.id) }}
                        search={{ type: "movie" }}
                        className={`group flex gap-3 rounded-xl border p-1 transition-all duration-300 ${isActiveMovie ? "border-logo-blue bg-logo-blue/10" : "border-white/10 bg-black/30 hover:bg-white/10"}`}
                      >
                        <div className="bg-logo-white/5 border-logo-white/2 relative flex w-full cursor-pointer flex-col overflow-hidden rounded-sm border md:rounded-lg">
                          {movie.backdrop_path ? (
                            <img
                              src={formatImagePath(
                                movie.backdrop_path,
                                "original",
                              )}
                              onContextMenu={(e) => e.preventDefault()}
                              onDragStart={(e) => e.preventDefault()}
                              className="aspect-video object-cover opacity-80 transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-100 active:scale-105 active:opacity-100"
                              alt={movie.title || movie.name || "Untitled"}
                            />
                          ) : (
                            <div className="bg-logo-white/10 text-logo-white/50 flex aspect-video w-full items-center justify-center text-[clamp(.7rem,1vw,.9rem)]">
                              No image
                            </div>
                          )}

                          <div className="from-logo-black pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />
                          <p className="text-logo-white/90 absolute right-0 bottom-0 left-0 flex flex-col items-start justify-between truncate from-25% p-1.5 md:p-2">
                            <span className="bg-logo-white/10 flex items-center gap-1 rounded-xs px-1 text-[clamp(.7rem,1vw,.9rem)] md:rounded-sm">
                              <CiCalendarDate className="text-logo-blue" />
                              {year}
                            </span>
                            <span className="text-logo-white/70 truncate text-[clamp(.5rem,1vw,.9rem)]">
                              {movie.title || movie.name}
                            </span>
                          </p>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <div className="text-logo-white/70 rounded-xl border border-dashed border-white/10 p-4 text-sm">
                    No collection or similar titles available.
                  </div>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PlayVideoPage;
