import { formatImagePath } from "@/lib/watch-utils";
import { getQueryOptions } from "@/query-options/QueryOptions";
import type { MediaItem, MediaType } from "@/types/TMDBTypes";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import HomepageSectionState from "./HomepageSectionState";

interface PopularSectionProps {
  type: MediaType;
}

const sectionTitles: Record<MediaType, string> = {
  movie: "Popular Movies",
  tv: "Popular TV Shows",
};

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
            className={`group border-logo-white/5 bg-logo-background relative min-h-0 overflow-hidden rounded-4xl border shadow-lg ${layout}`}
          >
            <div className="overflow-hidden p-1 font-mono text-[10px] font-medium tracking-[0.08em] text-white/80 uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <img
                src={image}
                alt={title}
                loading="lazy"
                draggable="false"
                className="absolute inset-0 h-full w-full rounded-4xl object-cover p-1 transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="from-logo-black via-logo-black/15 absolute inset-0 bg-linear-to-t to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
              <div className="flex items-end justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-logo-white truncate font-[ClashDisplay] text-base font-semibold sm:text-lg">
                    {title}
                  </h3>
                  <p className="text-logo-white/60 mt-0.5 text-xs">
                    {year} <span className="px-1">•</span>{" "}
                    {type === "tv" ? "TV Series" : "Movie"}
                  </p>
                </div>
                <span className="text-logo-blue flex shrink-0 items-center gap-1 text-xs font-medium">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {movie.vote_average.toFixed(1)}
                </span>
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

  return (
    <HomepageSectionState query={query}>
      {(data) => (
        <section className="relative mx-auto mb-10 w-full max-w-7xl">
          <h2 className="mb-5 w-full font-[ClashDisplay] text-[clamp(1.125rem,3vw,1.3rem)] font-medium text-white">
            {sectionTitles[type]}
          </h2>
          <PopularBentoGrid items={data.results} type={type} />
        </section>
      )}
    </HomepageSectionState>
  );
};

export default PopularSection;
