import { formatRuntime } from "@/lib/watch-utils";

import { CiCalendarDate } from "react-icons/ci";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { IoMdTime } from "react-icons/io";

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
    handleAddToWatchlist,
    watchDate,
    isBookmarked,
  } = data;

  return (
    <>
      {/* title */}

      <div>
        {watchLogoUrl ? (
          <img
            src={watchLogoUrl}
            className={`drop-shadow-logo-black/50 w-full max-w-[400px] object-cover py-5 drop-shadow-2xl`}
            alt={watchTitle}
          />
        ) : (
          <h1 className="text-logo-white mb-2 w-full text-start font-[ClashDisplay] text-[clamp(1.8rem,3vw,8rem)] font-medium">
            {watchTitle}
          </h1>
        )}
      </div>

      {/* tagline */}
      <p className="text-logo-white/90 my-2 w-full text-start font-[SansationLight] text-[clamp(.7rem,3vw,.9rem)] italic">
        {watchTagline}
      </p>

      {/* genres */}
      <div className="mb-2 flex w-full flex-wrap items-center justify-start gap-2 text-[clamp(.8rem,3vw,1rem)]">
        {watchGenres.map((genre: Genre, i: number) => (
          <span
            className="bg-logo-blue/15 border-logo-white/10 inline-block rounded-sm border px-2 py-1"
            key={i}
          >
            {genre.name}
          </span>
        ))}

        <div onClick={() => handleAddToWatchlist()} className="ml-2 text-2xl">
          {isBookmarked ? (
            <GoBookmarkFill className="text-logo-blue drop-shadow-logo-blue drop-shadow-2xl" />
          ) : (
            <GoBookmark className="text-logo-white/90 hover:text-logo-blue transition-colors duration-300" />
          )}
        </div>
      </div>

      {/* year and runtime */}
      <div className="my-2 flex space-x-3 border-y border-y-white/30 p-2 text-[clamp(.8rem,3vw,1rem)]">
        <p className="flex items-center gap-2">
          <CiCalendarDate />
          <span>{watchDate}</span>
        </p>
        <div className="bg-logo-white/30 w-[1px]" />

        {watchRuntime ? (
          <p className="flex items-center gap-2">
            <IoMdTime />
            <span>{formatRuntime(watchRuntime)}</span>
          </p>
        ) : (
          <div className="flex flex-wrap items-center justify-center space-x-2">
            <p className="text-logo-blue inline-flex items-center gap-1">
              Seasons:
              <span className="text-logo-white px-1">{watchSeasons}</span>
            </p>
            <p className="text-logo-blue ml-2 inline-flex items-center gap-1">
              Episodes:
              <span className="text-logo-white px-1">{watchEpisodes}</span>
            </p>
          </div>
        )}
      </div>

      {/* overview */}
      <p className="text-logo-white/90 mb-5 w-full text-start font-[SansationLight] text-[clamp(.9rem,3vw,1rem)]">
        {watchOverview || "No overview available."}
      </p>
    </>
  );
};

export default VideoMetadata;
