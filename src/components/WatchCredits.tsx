import type { TmdbCastMember } from "@/types/TMDBTypes";
import { formatImagePath } from "@/lib/watch-utils";

interface WatchCredits {
  data: TmdbCastMember[];
}

const WatchCredits = ({ data }: WatchCredits) => {
  return (
    <div className="hide-scrollbar my-2 flex space-x-2 overflow-x-scroll">
      {data?.map((cast) => (
        <img
          src={formatImagePath(cast.profile_path || "", "w300")}
          className="aspect-square w-20 rounded-xl object-cover"
        />
      ))}
    </div>
  );
};

export default WatchCredits;
