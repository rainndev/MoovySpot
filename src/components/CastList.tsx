import { formatImagePath } from "@/lib/watch-utils";

interface CastMember {
  id: number;
  name: string;
  character?: string;
  profile_path?: string | null;
}

interface CastListProps {
  cast: CastMember[];
}

/**
 * Auto-scrolling ("marquee") cast list.
 * - Scrolls left forever in a seamless loop (list is duplicated).
 * - Pauses smoothly on hover.
 * - No tailwind.config changes needed — keyframes are scoped inline.
 */
const CastList = ({ cast }: CastListProps) => {
  if (!cast || cast.length === 0) return null;

  // Duplicate the list so the track can loop from -50% back to 0% seamlessly
  const loopedCast = [...cast, ...cast];

  return (
    <div className="cast-scroll-wrapper relative w-full overflow-hidden">
      {/* Edge fades so items don't look like they're cut off */}
      <div className="from-logo-black pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r to-transparent md:w-24" />
      <div className="from-logo-black pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l to-transparent md:w-24" />

      <div className="cast-scroll-track flex w-max gap-4 will-change-transform">
        {loopedCast.map((member) => (
          <div
            key={member.id}
            className="bg-logo-black/40 border-logo-white/10 group hover:bg-logo-black/60 w-[130px] flex-shrink-0 cursor-pointer rounded-lg border p-4 text-center transition-all duration-300 hover:w-[160px]"
          >
            {member.profile_path ? (
              <img
                src={formatImagePath(member.profile_path, "w300")}
                alt={member.name}
                className="aspect-square w-full rounded-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                loading="lazy"
              />
            ) : (
              <div className="bg-logo-white/5 text-logo-white/50 flex aspect-square w-full items-center justify-center rounded-full px-2 text-center text-[clamp(.55rem,2.5vw,.7rem)]"></div>
            )}
            <p className="text-logo-white group-hover:text-logo-blue mt-2 line-clamp-1 font-[ClashDisplay] text-[clamp(.65rem,2.8vw,1rem)] transition-all">
              {member.name}
            </p>
            <p className="text-logo-white/60 line-clamp-1 text-[clamp(.55rem,2.5vw,.7rem)]">
              {member.character || "Unknown"}
            </p>
          </div>
        ))}
      </div>

      {/* Scoped animation — no tailwind.config edits required */}
      <style>{`
        .cast-scroll-track {
          animation: cast-scroll 30s linear infinite;
        }

        /* Smoothly ease into the pause instead of stopping abruptly */
        .cast-scroll-wrapper:hover .cast-scroll-track {
          animation-play-state: paused;
          transition: animation-play-state 0.3s ease;
        }

        @keyframes cast-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cast-scroll-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default CastList;
