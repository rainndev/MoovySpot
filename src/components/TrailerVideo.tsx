import { type Dispatch, type SetStateAction } from "react";
import ReactPlayer from "react-player";

interface TrailerVideo {
  trailerUrl: string;
  setShowTrailer: Dispatch<SetStateAction<boolean>>;
}

const TrailerVideo = ({ trailerUrl, setShowTrailer }: TrailerVideo) => {
  return (
    <div
      data-testid="trailer-video"
      className="fade-in pointer-events-none absolute inset-0 h-[120%] w-full -translate-y-15 opacity-100 transition-opacity duration-300 md:h-full"
    >
      <ReactPlayer
        playing
        url={trailerUrl}
        onError={(e) => console.log("onError", e)}
        onPlay={() => console.log("playing")}
        height="100%"
        width="100%"
        onEnded={() => setShowTrailer(false)}
        fallback={<h1 className="h-full w-full">Loading....</h1>}
        loop={false}
        controls={false}
      />
    </div>
  );
};

export default TrailerVideo;
