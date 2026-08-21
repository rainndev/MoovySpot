import { formatImagePath } from "@/lib/watch-utils";
import { getQueryOptions } from "@/query-options/QueryOptions";
import type { MediaItem, MediaType } from "@/types/TMDBTypes";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import HomepageSectionState from "./HomepageSectionState";

interface PopularSectionProps {
  type: MediaType;
}

const PopularBentoGrid = ({
  items,
  type,
}: {
  items: MediaItem[];
  type: MediaType;
}) => {
  const cards = items
    .filter((item) => item.backdrop_path || item.poster_path)
    .slice(0, 9);

  return (
    <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[180px] md:auto-rows-[150px] md:grid-cols-4 lg:auto-rows-[170px]">
      {cards.map((movie, index) => {
        const title = movie.title || movie.name || "Untitled";
        const date = movie.release_date || movie.first_air_date;
        const year = date ? new Date(date).getFullYear() : "N/A";
        const image = formatImagePath(
          movie.backdrop_path || movie.poster_path,
          "w780",
        );
        const layout = [
          "col-span-2 row-span-2 md:col-span-1 md:row-span-2",
          "col-span-2 row-span-1 md:col-span-2",
          "col-span-1 row-span-1 md:col-span-1",
          "col-span-1 row-span-1 md:col-span-1",
          "col-span-2 row-span-1 md:col-span-2",
          "col-span-2 row-span-1 md:col-span-1",
        ][index];

        return (
          <Link
            key={movie.id}
            to="/details/$id"
            params={{ id: String(movie.id) }}
            search={{ type: movie.media_type ?? type }}
            className={`group to-logo-background/50 from-logo-white/20 relative min-h-0 overflow-hidden rounded-3xl bg-linear-to-b via-[#292929] shadow-lg md:rounded-4xl ${layout}`}
          >
            <div className="overflow-hidden p-1 font-mono text-[10px] font-medium tracking-[0.08em] text-white/80 uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <img
                src={image}
                alt={title}
                loading="lazy"
                draggable="false"
                className="absolute inset-0 h-full w-full rounded-3xl object-cover p-1 grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0 md:rounded-4xl"
              />
            </div>

            <div className="from-logo-black via-logo-black/15 absolute inset-0 bg-linear-to-t to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
              <div className="flex items-end justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-logo-white truncate font-[ClashDisplay] font-medium">
                    {title}
                  </h3>
                  <p className="text-logo-white/60 text-xs">{year}</p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const PopularSection = ({ type }: PopularSectionProps) => {
  const query = useQuery(getQueryOptions(type, "popular"));
  const shouldReduceMotion = useReducedMotion();

  return (
    <HomepageSectionState query={query}>
      {(data) => (
        <section className="relative isolate mx-auto mb-10 w-full max-w-7xl">
          <motion.div
            aria-hidden="true"
            animate={
              shouldReduceMotion
                ? undefined
                : { opacity: [0.55, 1, 0.55], scale: [0.92, 1.12, 0.92] }
            }
            transition={{
              duration: 7,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="bg-logo-blue/35 pointer-events-none absolute top-12 -left-12 z-0 size-56 rounded-full blur-[75px] sm:size-80 md:top-20 md:-left-24 md:size-112 md:blur-[110px]"
          />
          <motion.div
            aria-hidden="true"
            animate={
              shouldReduceMotion
                ? undefined
                : { opacity: [0.45, 0.9, 0.45], scale: [1.08, 0.94, 1.08] }
            }
            transition={{
              duration: 9,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="pointer-events-none absolute right-0 -bottom-12 z-0 size-56 rounded-full bg-violet-500/30 blur-[75px] sm:-right-10 sm:size-80 md:-right-20 md:-bottom-20 md:size-112 md:blur-[110px]"
          />
          <h2 className="relative z-10 mb-5 w-full text-center font-[ClashDisplay] text-[clamp(1.125rem,3vw,1.3rem)] font-medium text-white">
            Popular
          </h2>
          <div className="relative z-10">
            <PopularBentoGrid items={data.results} type={type} />
          </div>
        </section>
      )}
    </HomepageSectionState>
  );
};

export default PopularSection;
