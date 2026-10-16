import EpisodeCard from "@/components/EpisodeCard";
import ErrorUI from "@/components/ErrorUI";
import ServerLoader from "@/components/ServerLoader";
import { serverUrlOption } from "@/data/server-data";
import {
  useServerFailover,
  type FailoverServer,
} from "@/hooks/use-server-failover";
import { useWatchData } from "@/hooks/use-watch-data";
import { cn } from "@/lib/utils";
import { formatImagePath } from "@/lib/watch-utils";
import { useCollectionOptions } from "@/query-options/QueryCollectionOptions";
import { useSimilarOptions } from "@/query-options/QueryOptions";
import { useSeasonOptions } from "@/query-options/QuerySeasonOptions";
import type { PlaySearch } from "@/routes/play.$id";
import PlayVideoSkeleton, {
  PlayCardGridSkeleton,
} from "@/sections/PlayVideoContainer/PlayVideoSkeleton";
import type { MediaItem } from "@/types/TMDBTypes";
import type { Episode, SeasonInfo } from "@/types/TvSeriesTypes";
import { useQueries } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import { toast } from "sonner";

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
  const shouldReduceMotion = useReducedMotion();
  const MEDIA_TYPE = searchParams.type;
  const isMovie = MEDIA_TYPE === "movie";
  const isTv = MEDIA_TYPE === "tv";
  const numericId = Number(id);
  const resolvedId = Number.isFinite(numericId) ? numericId : 0;

  const {
    collection_id,
    isLoading,
    isError,
    error,
    watchTitle,
    watchLogoUrl,
    watchSeasonsData,
  } = useWatchData(MEDIA_TYPE ?? "movie", resolvedId);

  const currentSeason =
    searchParams.season ?? watchSeasonsData[0]?.season_number ?? 1;
  const currentEpisode = searchParams.episode ?? 1;

  const serverOptions = useMemo<FailoverServer[]>(() => {
    return serverUrlOption.map((option) => ({
      name: option.name,
      url: isMovie
        ? option.movieLink.replace("##id##", String(resolvedId))
        : option.tvLink
            .replace("##id##", String(resolvedId))
            .replace("##season##", String(currentSeason))
            .replace("##episode##", String(currentEpisode)),
    }));
  }, [currentEpisode, currentSeason, isMovie, resolvedId]);

  const {
    server,
    status: serverStatus,
    failedNames,
    isExhausted,
    markReady,
    selectServer,
    reportUnavailable,
    retry: retryServers,
  } = useServerFailover(serverOptions, {
    enabled: !isLoading && serverOptions.length > 0,
    onSwitch: (next, previous) => {
      toast("Server unavailable", {
        description: `${previous.name} did not respond — switched to ${next.name}.`,
      });
    },
    onExhausted: () => {
      toast("No working server", {
        description: "Every source failed to load. Retry or pick one manually.",
      });
    },
  });

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const handleIframeLoad = () => {
    try {
      const href = iframeRef.current?.contentWindow?.location.href;
      // A frame still parked on about:blank never rendered a player, so keep the
      // failover watchdog running instead of marking the server healthy.
      if (href === "about:blank") return;
    } catch {
      // Cross-origin access throws for a normally loaded embed — expected.
    }
    markReady();
  };

  useEffect(() => {
    if (watchTitle) {
      document.title = `MoovySpot | ${watchTitle}`;
    }
  }, [watchTitle]);

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
    return <PlayVideoSkeleton />;
  }

  if (showInvalidState) {
    return (
      <div className="flex min-h-dvh w-full items-center justify-center px-5 text-center text-white/70">
        Invalid media type or ID. Please check the URL.
      </div>
    );
  }

  if (isError) {
    return <ErrorUI error={error?.message} />;
  }

  const enter = (order: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.45,
      ease: "easeOut" as const,
      delay: shouldReduceMotion ? 0 : order * 0.09,
    },
  });

  return (
    <div className="bg-logo-black text-logo-white mx-auto min-h-dvh w-full max-w-7xl p-3 md:px-10 md:pt-28 md:pb-10">
      <div className="mx-auto flex w-full flex-col gap-5">
        <motion.div className="flex flex-col" {...enter(0)}>
          <p className="text-logo-white/50 text-[clamp(.65rem,2vw,.85rem)] tracking-[0.3em] uppercase">
            Now Playing
          </p>
          {watchLogoUrl ? (
            <img
              src={watchLogoUrl}
              alt={watchTitle}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="mt-1 h-[clamp(2.25rem,6vw,4rem)] w-auto max-w-[min(100%,22rem)] object-contain object-left"
            />
          ) : (
            <h1 className="font-[ClashDisplay] text-[clamp(1.5rem,3vw,2rem)] font-medium">
              {watchTitle}
            </h1>
          )}
        </motion.div>

        <div className="flex flex-col gap-5">
          <motion.section className="space-y-4" {...enter(1)}>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/40">
              <div className="relative aspect-video w-full">
                <iframe
                  key={server.url}
                  ref={iframeRef}
                  data-testid="play-main-video"
                  className="bg-logo-white/5 h-full w-full"
                  allowFullScreen
                  frameBorder="0"
                  src={serverStatus === "probing" ? undefined : server.url}
                  title={watchTitle}
                  onLoad={handleIframeLoad}
                />

                {(serverStatus === "probing" ||
                  serverStatus === "loading") && (
                  <ServerLoader
                    phase={serverStatus === "probing" ? "checking" : "loading"}
                    serverName={server.name}
                    attempt={Math.min(
                      failedNames.length + 1,
                      serverOptions.length,
                    )}
                    total={serverOptions.length}
                  />
                )}

                {isExhausted && (
                  <div className="bg-logo-black/90 absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-6 text-center backdrop-blur-sm">
                    <p className="text-logo-white/60 text-[clamp(.8rem,3.2vw,.95rem)]">
                      No servers are available for this title.
                    </p>
                    <button
                      type="button"
                      onClick={retryServers}
                      className="bg-logo-blue text-logo-black hover:bg-logo-blue/90 h-9 rounded-lg px-5 text-[clamp(.75rem,3vw,.85rem)] font-medium transition-colors"
                    >
                      Try again
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* server selection */}
            <div className="border-logo-white/10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-3 backdrop-blur-sm sm:p-4">
              <p className="text-logo-white/50 text-[clamp(.65rem,2.6vw,.72rem)] tracking-[0.25em] uppercase">
                Server
              </p>

              <div className="ml-auto flex items-center gap-2">
                <Select
                  value={server.url}
                  onValueChange={(value: string) => {
                    const nextIndex = serverOptions.findIndex(
                      (option) => option.url === value,
                    );
                    if (nextIndex !== -1) selectServer(nextIndex);
                  }}
                >
                  <SelectTrigger
                    className="w-[8.75rem] text-[clamp(.72rem,3vw,.8rem)]"
                    data-testid="play-server-select"
                  >
                    <SelectValue placeholder="Select server" />
                  </SelectTrigger>
                  <SelectContent>
                    {serverOptions.map((option) => (
                      <SelectItem
                        key={option.name}
                        value={option.url}
                        className={cn(
                          failedNames.includes(option.name) &&
                            "text-logo-white/35",
                        )}
                      >
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <button
                  type="button"
                  onClick={reportUnavailable}
                  title="Not playing? Try the next server"
                  data-testid="play-next-server"
                  className="border-logo-white/10 text-logo-white/70 hover:bg-logo-white/5 hover:text-logo-white h-9 shrink-0 rounded-md border px-3 text-[clamp(.72rem,3vw,.8rem)] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </motion.section>

          <motion.aside
            data-testid="play-up-next"
            className="rounded-2xlbackdrop-blur-sm h-fit w-full"
            {...enter(2)}
          >
            <div className="mb-4 flex items-end justify-between gap-3">
              <h2
                data-testid="play-up-next-title"
                className="mt-5 font-[ClashDisplay] text-[clamp(1rem,2.4vw,1.4rem)] font-medium"
              >
                {isMovie ? upNextTitle : `Season ${currentSeason}`}
              </h2>

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
                    className="w-35"
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
              <div className="space-y-3">
                {seasonQuery.isLoading && <PlayCardGridSkeleton />}
                {seasonQuery.isError && (
                  <div className="text-logo-white/70 text-sm">
                    Could not load episodes.
                  </div>
                )}
                <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:gap-2 lg:grid-cols-4">
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
              </div>
            ) : (
              <div className="space-y-3">
                {collectionQuery.isLoading || similarQuery.isLoading ? (
                  <PlayCardGridSkeleton />
                ) : upNextMovies.length > 0 ? (
                  <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:gap-2 lg:grid-cols-4">
                    {upNextMovies.map((movie: MediaItem) => {
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
                          className={`block rounded-xl border p-1 transition-all duration-300 ${isActiveMovie ? "border-logo-blue bg-logo-blue/10" : "border-white/10 bg-black/30 hover:bg-white/10"}`}
                        >
                          <div className="bg-logo-white/5 border-logo-white/2 relative flex w-full cursor-pointer flex-col overflow-hidden rounded-md border">
                            {movie.backdrop_path ? (
                              <img
                                src={formatImagePath(
                                  movie.backdrop_path,
                                  "w300",
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
                    })}
                  </div>
                ) : (
                  <div className="text-logo-white/70 rounded-xl border border-dashed border-white/10 p-4 text-sm">
                    No collection or similar titles available.
                  </div>
                )}
              </div>
            )}
          </motion.aside>
        </div>
      </div>
    </div>
  );
};

export default PlayVideoPage;
