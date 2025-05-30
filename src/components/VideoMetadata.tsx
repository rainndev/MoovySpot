import { formatRuntime, formatWatchUrl } from "@/lib/watch-utils";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSeasonOptions } from "@/query-options/QuerySeasonOptions";
import type { SeasonInfo, Episode } from "@/types/TvSeriesTypes";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingAnimation from "./LoadingAnimation";
import EpisodeCard from "./EpisodeCard";
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
    watchRuntime,
    watchTagline,
    watchEpisodes,
    watchSeasons,
    watchSeasonsData,
    watchDate,
    numericId,
    MEDIA_TYPE,
  } = data;

  const limitGenres = watchGenres.slice(0, 3);
  const [season, setSeason] = useState(
    String(watchSeasonsData[0]?.season_number),
  );
  const isMovie = MEDIA_TYPE === "movie";

  const {
    data: seasonData,
    isLoading,
    error,
    isError,
  } = useQuery({
    ...useSeasonOptions(+season, numericId),
    enabled: !isMovie,
  });
  console.log(seasonData?.episodes);

  return (
    <div className="z-2 -translate-y-20 p-5 md:-translate-y-50">
      {/* title */}

      <div>
        {watchLogoUrl ? (
          <img
            src={watchLogoUrl}
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
              <span className="text-logo-white/90 px-1">{watchSeasons}</span>
            </p>
            <p className="text-logo-blue ml-2 inline-flex items-center gap-1">
              Episodes:
              <span className="text-logo-white/90 px-1">{watchEpisodes}</span>
            </p>
          </div>
        )}
      </div>

      {/* overview */}
      <p className="text-logo-white/90 mb-5 w-full text-start font-[SansationLight] text-[clamp(.8rem,1.8vw,1.2rem)]">
        {watchOverview || "No overview available."}
      </p>

      {/* watch button */}

      <div className="flex space-x-2">
        <Link to={formatWatchUrl(numericId, MEDIA_TYPE, "play")}>
          <button className="bg-logo-blue drop-shadow-logo-blue/5 text-logo-black hover:bg-logo-blue/60 active:bg-logo-blue/60 cursor-pointer rounded-full px-10 py-2 font-[ClashDisplay] text-[clamp(.7rem,3vw,1rem)] font-medium drop-shadow-2xl transition-all duration-300 ease-in-out">
            Watch Now
          </button>
        </Link>
        <button className="border-logo-white/20 text-logo-white hover:bg-logo-white/10 active:bg-logo-white/10 cursor-pointer rounded-full border px-7 py-2 font-[ClashDisplay] text-[clamp(.7rem,3vw,1rem)] font-medium transition-all duration-300 ease-in-out">
          Trailer
        </button>
      </div>

      {/* for tv series */}
      {!isMovie && (
        <div className="mt-5">
          {/* select seasons */}
          <Select value={season} onValueChange={(value) => setSeason(value)}>
            <SelectTrigger className="w-fit text-[clamp(.7rem,3vw,.9rem)]">
              <SelectValue placeholder={watchSeasonsData[0].name} />
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
            {seasonData?.episodes.map((episode: Episode) => (
              <Link
                to={`/play/${numericId}?type=tv&season=${season}&episode=${episode.episode_number}`}
                key={episode.id}
              >
                <EpisodeCard episode={episode} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoMetadata;
