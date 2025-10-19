import { useWatchTypeStore } from "@/store/WatchTypeStore";

const TypeNavigation = () => {
  const setWatchType = useWatchTypeStore((state) => state.setWatchType);
  const watchType = useWatchTypeStore((state) => state.watchType);
  const isMovie = watchType === "movie";

  return (
    <div className="bg text-logo-white mb-2 flex w-full items-center justify-start py-3 md:py-5">
      <p
        onClick={() => setWatchType("movie")}
        className={`${isMovie ? "bg-logo-white/10" : "bg-logo-white/1"} border-logo-background hover:bg-logo-white/10 cursor-pointer rounded-md border px-6 py-2 text-[clamp(.7rem,3vw,1rem)] transition duration-200 md:px-8`}
      >
        Movie
      </p>
      <p
        onClick={() => setWatchType("tv")}
        className={`${!isMovie ? "bg-logo-white/10" : "bg-logo-white/1"} border-logo-background hover:bg-logo-white/10 ml-2 cursor-pointer rounded-md border px-6 py-2 text-[clamp(.7rem,3vw,1rem)] transition duration-200 md:px-8`}
      >
        TV Shows
      </p>
    </div>
  );
};

export default TypeNavigation;
