import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { FaServer } from "react-icons/fa6";
import { serverUrlOption } from "@/data/server-data";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PlayVideoPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const MEDIA_TYPE = searchParams.get("type");
  const EPISODE = searchParams.get("episode");
  const SEASON = searchParams.get("season");
  const [server, setServer] = useState("");
  const isMovie = MEDIA_TYPE === "movie";

  //http://localhost:5173/play/100088?type=tv&season=2&episode=3
  //"https://vidsrc.cc/v2/embed/tv/##id##/##season##/##episode##

  const serverOptions = useMemo(() => {
    return serverUrlOption.map((option) => {
      if (isMovie) {
        return option.movieLink.replace("##id##", String(id));
      }

      return option.tvLink
        .replace("##id##", String(id))
        .replace("##season##", String(SEASON))
        .replace("##episode##", String(EPISODE));
    });
  }, [MEDIA_TYPE, id]);

  useEffect(() => {
    if (serverOptions.length) setServer(serverOptions[0]);
  }, [serverOptions]);

  console.log("server---------------------", server);

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center pb-20 md:p-2 md:pl-25">
      <div className="h-full w-full overflow-hidden md:rounded-lg">
        <iframe
          className="bg-logo-white/5 h-full w-full"
          allowFullScreen
          frameBorder="0"
          src={server}
        />
      </div>
      <div className="z-2 my-3 flex w-full flex-col gap-2 px-2 md:flex-row">
        <Select value={server} onValueChange={(value) => setServer(value)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <FaServer className="text-logo-blue shadow-logo-blue/50 shadow-2xl" />
            <SelectValue placeholder="Select Server" />
          </SelectTrigger>
          <SelectContent>
            {serverOptions.map((option, i) => (
              <SelectItem key={i} value={option}>
                Server {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Episode/Seasons */}
      <div></div>
    </div>
  );
};

export default PlayVideoPage;
