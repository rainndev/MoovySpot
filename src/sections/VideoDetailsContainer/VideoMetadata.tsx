import { formatImagePath, formatRuntime } from "@/lib/watch-utils";
import { useSeasonOptions } from "@/query-options/QuerySeasonOptions";
import type { Episode, SeasonInfo } from "@/types/TvSeriesTypes";
import { useQueries } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { MdOutlineVideocam, MdOutlineVideocamOff } from "react-icons/md";

import CollectionCard from "@/components/CollectionCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCollectionOptions } from "@/query-options/QueryCollectionOptions";
import { useCreditsOptions } from "@/query-options/QueryCreditsOptions";
import type { MediaItem, TmdbCastMember } from "@/types/TMDBTypes";
import EpisodeCard from "../../components/EpisodeCard";
import LoadingAnimation from "../../components/LoadingAnimation";
interface Genre {
  id: number;
  name: string;
}

interface VideoMetadataProps {
  data: any;
}

const VideoMetadata = ({ data }: VideoMetadataProps) => {
  const {
    watchGenres,
    watchOverview,
    watchLogoUrl,
    watchTitle,
    isTrailerPlayble,
    watchRuntime,
    watchTagline,
    watchEpisodes,
    watchSeasons,
    watchSeasonsData,
    watchDate,
    showTrailer,
    collection_id,
    setShowTrailer,
    numericId,
    MEDIA_TYPE,
    watchDetails,
  } = data;

  const limitGenres = watchGenres.slice(0, 3);
  const [season, setSeason] = useState<number | undefined>(undefined);

  // When watchSeasonsData loads, set the first season as default
  useEffect(() => {
    if (watchSeasonsData && watchSeasonsData.length > 0) {
      setSeason(watchSeasonsData[0].season_number);
    }
  }, [watchSeasonsData]);

  const isMovie = MEDIA_TYPE === "movie";

  // const { data: seasonData, isLoading, error, isError } = useQuery();

  const [seasonDetails, collectionData, creditsData] = useQueries({
    queries: [
      {
        ...useSeasonOptions(season !== undefined ? +season : 1, numericId),
        enabled: !isMovie,
      },
      {
        ...useCollectionOptions(collection_id),
        enabled:
          collection_id !== null && collection_id !== undefined && isMovie,
      },
      {
        ...useCreditsOptions(MEDIA_TYPE, numericId),
        enabled: !!MEDIA_TYPE && !!numericId,
      },
    ],
  });

  if (!seasonDetails) return;
  const { data: seasonData, isLoading, error, isError } = seasonDetails;
  const castList = (creditsData.data || []).slice(0, 12);

  const extraInfo = [
    {
      label: "Rating",
      value: watchDetails?.vote_average
        ? `${watchDetails.vote_average.toFixed(1)} / 10`
        : "N/A",
    },
    {
      label: "Language",
      value: watchDetails?.original_language
        ? String(watchDetails.original_language).toUpperCase()
        : "N/A",
    },
    {
      label: "Status",
      value: watchDetails?.status || "N/A",
    },
  ];

  return (
    <div className="z-2 -translate-y-20 p-5 md:-translate-y-50 lg:-translate-y-100">
      {/* title */}

      <div>
        {watchLogoUrl ? (
          <img
            src={watchLogoUrl}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            className={`drop-shadow-logo-black/50 w-full max-w-[500px] object-cover py-5 drop-shadow-2xl`}
            alt={watchTitle}
          />
        ) : (
          <h1 className="text-logo-white mb-2 w-full text-start font-[ClashDisplay] text-[clamp(1.8rem,3vw,8rem)] font-medium">
            {watchTitle}
          </h1>
        )}
      </div>

      {/* tagline */}
      <p className="text-logo-white/90 my-2 w-full text-start font-[SansationLight] text-[clamp(.7rem,3vw,1rem)] italic">
        {watchTagline}
      </p>

      {/* genres */}
      <div className="text-logo-white/90 mb-2 flex w-full flex-wrap items-center justify-start gap-2 font-[SansationLight] text-[clamp(.8rem,1.5vw,.9rem)]">
        {limitGenres.map((genre: Genre, i: number) => (
          <span
            className="border-logo-white/10 inline-block rounded-sm border px-3 py-1"
            key={i}
          >
            {genre.name}
          </span>
        ))}
      </div>

      {/* year and runtime */}
      <div className="text-logo-white/90 my-2 flex w-fit space-x-3 rounded-sm border border-white/10 px-3 py-1 font-[SansationLight] text-[clamp(.8rem,1.5vw,.9rem)]">
        <p className="flex items-center gap-2">
          <CiCalendarDate className="text-logo-blue" />
          <span>{watchDate}</span>
        </p>
        <div className="bg-logo-white/10 w-[1px]" />

        {watchRuntime ? (
          <p className="flex items-center gap-2">
            <IoMdTime className="text-logo-blue" />
            <span>{formatRuntime(watchRuntime)}</span>
          </p>
        ) : (
          <div className="flex flex-wrap items-center justify-center space-x-2">
            <p className="text-logo-blue inline-flex items-center gap-1">
              Seasons:
              <span className="text-logo-white/90 px-1">
                {watchSeasons || "N/A"}
              </span>
            </p>
            <p className="text-logo-blue ml-2 inline-flex items-center gap-1">
              Episodes:
              <span className="text-logo-white/90 px-1">
                {watchEpisodes || "N/A"}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* overview */}
      <p className="text-logo-white/90 mb-5 w-full text-start font-[SansationLight] text-[clamp(.8rem,1.8vw,1.2rem)]">
        {watchOverview || "No overview available."}
      </p>

      <div className="mb-5 grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
        {extraInfo.map((item) => (
          <div
            key={item.label}
            className="bg-logo-black/40 border-logo-white/10 rounded-md border px-4 py-3"
          >
            <p className="text-logo-white/60 text-[clamp(.65rem,2.8vw,.8rem)] tracking-[0.15em] uppercase">
              {item.label}
            </p>
            <p className="text-logo-white mt-1 font-[ClashDisplay] text-[clamp(.75rem,3vw,1rem)]">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 mb-5">
        <h2 className="font-[ClashDisplay] text-[clamp(1rem,3vw,1.4rem)]">
          Cast
        </h2>
        {castList.length > 0 ? (
          <div className="hide-scrollbar mt-4 flex gap-3 overflow-x-auto pb-2">
            {castList.map((cast: TmdbCastMember) => (
              <div
                key={cast.id}
                className="bg-logo-black/40 border-logo-white/10 group hover:bg-logo-black/60 w-[130px] flex-shrink-0 cursor-pointer rounded-lg border p-4 transition-all duration-300 hover:w-[160px]"
              >
                {cast.profile_path ? (
                  <img
                    src={formatImagePath(cast.profile_path, "w300")}
                    alt={cast.name}
                    className="aspect-square w-full rounded-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="bg-logo-white/5 text-logo-white/50 flex aspect-square w-full items-center justify-center rounded-full px-2 text-center text-[clamp(.55rem,2.5vw,.7rem)]"></div>
                )}
                <p className="text-logo-white group-hover:text-logo-blue mt-2 line-clamp-1 font-[ClashDisplay] text-[clamp(.65rem,2.8vw,1rem)] transition-all">
                  {cast.name}
                </p>
                <p className="text-logo-white/60 line-clamp-1 text-[clamp(.55rem,2.5vw,.7rem)]">
                  {cast.character || "Unknown"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-logo-white/60 mt-2 text-[clamp(.75rem,2.8vw,.9rem)]">
            Cast information is unavailable.
          </p>
        )}
      </div>

      {/* watch button */}
      {/* to={formatWatchUrl(numericId, MEDIA_TYPE, "play")} */}
      <div className="flex space-x-2">
        {isMovie ? (
          <Link
            params={{ id: numericId }}
            search={{ type: MEDIA_TYPE }}
            to="/play/$id"
          >
            <button className="bg-logo-blue drop-shadow-logo-blue/5 text-logo-black hover:bg-logo-blue/60 active:bg-logo-blue/60 flex cursor-pointer items-center rounded-full px-10 py-2 font-[ClashDisplay] text-[clamp(.7rem,3vw,1rem)] font-medium text-nowrap drop-shadow-2xl transition-all duration-300 ease-in-out">
              <p>Watch Now</p>
            </button>
          </Link>
        ) : (
          <Link
            params={{ id: numericId }}
            search={{
              type: "tv",
              season: watchSeasonsData[0].season_number,
              episode: 1,
            }}
            to="/play/$id"
          >
            <button className="bg-logo-blue drop-shadow-logo-blue/5 text-logo-black hover:bg-logo-blue/60 active:bg-logo-blue/60 flex cursor-pointer items-center rounded-full px-10 py-2 font-[ClashDisplay] text-[clamp(.7rem,3vw,1rem)] font-medium text-nowrap drop-shadow-2xl transition-all duration-300 ease-in-out">
              <p>
                {isMovie
                  ? "Watch Now"
                  : `Watch (S${watchSeasonsData[0].season_number} - EP1)`}
              </p>
            </button>
          </Link>
        )}
        <button
          disabled={!isTrailerPlayble}
          onClick={() => setShowTrailer(!showTrailer)}
          className={`hover:bg-logo-white/10 active:bg-logo-white/10 flex cursor-pointer items-center gap-2 rounded-full border px-7 py-2 font-[ClashDisplay] text-[clamp(.7rem,3vw,1rem)] font-medium transition-all duration-300 ease-in-out ${showTrailer ? "bg-logo-white/10" : ""} ${!isTrailerPlayble ? "border-logo-white/10 text-logo-white/10" : "border-logo-white/20"}`}
        >
          <span>
            {showTrailer ? (
              <MdOutlineVideocam
                className={`${!isTrailerPlayble ? "text-logo-white/10" : "text-logo-blue drop-shadow-logo-blue"} drop-shadow-2xl`}
              />
            ) : (
              <MdOutlineVideocamOff />
            )}
          </span>
          <span>{isTrailerPlayble ? "Trailer" : "N/A"}</span>
        </button>
      </div>

      {/* for tv series */}
      {!isMovie && (
        <div className="mt-5">
          {/* select seasons */}
          <Select
            value={String(season)}
            onValueChange={(value) => setSeason(+value)}
          >
            <SelectTrigger className="w-fit text-[clamp(.7rem,3vw,.9rem)]">
              <SelectValue
                placeholder={watchSeasonsData[0]?.name || "Select a season"}
              />
            </SelectTrigger>
            <SelectContent>
              {watchSeasonsData.map((seasonData: SeasonInfo, index: number) => (
                <SelectItem
                  className="text-[clamp(.7rem,3vw,.9rem)]"
                  key={index}
                  value={String(seasonData.season_number)}
                >
                  {seasonData.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* render episode */}
          {isLoading && <LoadingAnimation />}
          {isError && (
            <div className="text-logo-white/90 h-full w-full">
              Error: {error?.message}
            </div>
          )}

          <div className="mt-5 grid grid-cols-2 gap-1 sm:grid-cols-3 md:gap-2 lg:grid-cols-4 xl:grid-cols-5">
            {seasonData &&
              seasonData.episodes.map((episode: Episode) => (
                <Link
                  to="/play/$id"
                  params={{ id: numericId }}
                  search={{
                    type: "tv",
                    season: season,
                    episode: episode.episode_number,
                  }}
                  key={episode.id}
                >
                  <EpisodeCard episode={episode} />
                </Link>
              ))}
          </div>
        </div>
      )}

      {/* for movie collection */}
      {isMovie && collectionData.isSuccess && (
        <>
          <h1 className="mt-10 font-[SansationLight] text-[clamp(.8rem,1.5vw,1rem)]">
            {collectionData?.data?.name}
          </h1>
          <div className="mt-5 grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
            {collectionData &&
              collectionData?.data?.parts.map((data: MediaItem) => (
                <CollectionCard
                  key={data.id}
                  movie={{ ...data, type: "movie" }}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default VideoMetadata;
