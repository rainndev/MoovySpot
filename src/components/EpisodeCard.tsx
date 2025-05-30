import { formatImagePath } from "@/lib/watch-utils";
import type { Episode } from "@/types/TvSeriesTypes";
import { MdOutlinePersonalVideo } from "react-icons/md";

interface EpisodeCardProps {
  episode: Episode;
}

const EpisodeCard = ({ episode }: EpisodeCardProps) => {
  return (
    <div
      className="bg-logo-white/5 border-logo-white/2 relative flex w-full cursor-pointer flex-col overflow-hidden rounded-sm border md:rounded-lg"
      key={String(episode.id)}
    >
      {episode.still_path ? (
        <img
          src={formatImagePath(episode.still_path, "w300")}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          className="aspect-video object-cover opacity-80 transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-100 active:scale-105 active:opacity-100"
          alt={String(episode.id)}
        />
      ) : (
        <div className="bg-logo-white/10 text-logo-white/50 flex aspect-video w-full items-center justify-center text-[clamp(.7rem,1vw,.9rem)]">
          No image
        </div>
      )}

      <div className="from-logo-black pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />
      <p className="text-logo-white/90 absolute right-0 bottom-0 left-0 flex flex-col items-start justify-between truncate from-25% p-1.5 md:p-2">
        <span className="bg-logo-white/10 flex items-center gap-1 rounded-xs px-1 text-[clamp(.7rem,1vw,.9rem)] md:rounded-sm">
          <MdOutlinePersonalVideo className="text-logo-blue" />
          {episode.episode_number}
        </span>
        <span className="text-logo-white/70 truncate text-[clamp(.5rem,1vw,.9rem)]">
          {episode.name}
        </span>
      </p>
    </div>
  );
};

export default EpisodeCard;
