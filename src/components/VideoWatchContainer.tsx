import { useLocation, useParams } from "react-router-dom";

const VideoWatchContainer = () => {
  const { id } = useParams();
  const location = useLocation();
  return (
    <div className="flex h-dvh w-full items-center justify-center">
      Movie{id}
    </div>
  );
};

export default VideoWatchContainer;
