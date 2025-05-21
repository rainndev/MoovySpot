import ScrollContainer from "react-indiana-drag-scroll";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

interface PopularListProps {
  data: any;
  type: string;
}
const PopularList = ({ data, type }: PopularListProps) => {
  if (!data) return;

  console.log(data);

  return (
    <ScrollContainer className="flex space-x-3 active:cursor-grabbing md:space-x-4">
      {data.results.map((movie: any) => (
        <Link to={`/watch/${movie.id}`} key={movie.id}>
          <div
            key={movie.id}
            className="group h-full w-[150px] flex-shrink-0 snap-start overflow-hidden md:w-[220px] xl:w-[300px]"
          >
            <div className="border-logo-white/10 w-full overflow-hidden rounded-xl border-3 md:border-4">
              <img
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                loading="lazy"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="scale-100 object-cover opacity-90 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-50 active:scale-105 active:opacity-50"
              />
            </div>

            <h2 className="mt-3 text-[clamp(.8rem,3vw,1.25rem)] font-medium text-white">
              {movie.title}
            </h2>
            <div className="mt-1 mb-4 flex items-center justify-between text-[clamp(.7rem,3vw,1rem)]">
              <p className="text-gray-400">
                {type === "movie"
                  ? movie.release_date.split("-")[0]
                  : movie.first_air_date.split("-")[0]}
              </p>
              <div className="flex items-center text-yellow-400">
                <FaStar />
                <p className="ml-2">{movie.vote_average}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </ScrollContainer>
  );
};

export default PopularList;
