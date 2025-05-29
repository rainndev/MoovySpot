import { useLocation, useParams } from "react-router-dom";

const VideoWatchContainer = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const MEDIA_TYPE = queryParams.get("type");

  return (
    <div className="flex h-dvh w-full items-center justify-center">
      Movie: {id} <br />
      Type: {MEDIA_TYPE}
    </div>
  );
};

export default VideoWatchContainer;
