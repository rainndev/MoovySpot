import { formatRuntime } from "@/lib/watch-utils";
import { CiCalendarDate } from "react-icons/ci";
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
    watchDate,
  } = data;

  const limitGenres = watchGenres.slice(0, 3);

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
      <div className="text-logo-white/90 mb-2 flex w-full flex-wrap items-center justify-start gap-2 font-[SansationLight] text-[clamp(.8rem,3vw,1rem)]">
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
      <div className="text-logo-white/90 my-2 flex space-x-3 border-y border-y-white/10 p-2 font-[SansationLight] text-[clamp(.8rem,3vw,1rem)]">
        <p className="flex items-center gap-2">
          <CiCalendarDate />
          <span>{watchDate}</span>
        </p>
        <div className="bg-logo-white/10 w-[1px]" />

        {watchRuntime ? (
          <p className="flex items-center gap-2">
            <IoMdTime />
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
      <p className="text-logo-white/90 mb-5 w-full text-start font-[SansationLight] text-[clamp(.8rem,3vw,1.2rem)]">
        {watchOverview || "No overview available."}
      </p>

      {/* watch button */}

      <div className="flex space-x-2">
        <button className="bg-logo-blue drop-shadow-logo-blue/5 text-logo-black hover:bg-logo-blue/60 active:bg-logo-blue/60 cursor-pointer rounded-full px-10 py-2 font-[ClashDisplay] text-[clamp(.7rem,3vw,1rem)] font-medium drop-shadow-2xl transition-all duration-300 ease-in-out">
          Watch Now
        </button>
        <button className="border-logo-white/20 text-logo-white hover:bg-logo-white/10 active:bg-logo-white/10 cursor-pointer rounded-full border px-7 py-2 font-[ClashDisplay] text-[clamp(.7rem,3vw,1rem)] font-medium transition-all duration-300 ease-in-out">
          Trailer
        </button>
      </div>
    </div>
  );
};

export default VideoMetadata;
