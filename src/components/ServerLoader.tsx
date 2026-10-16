import { cn } from "@/lib/utils";
import { FaServer } from "react-icons/fa6";

interface ServerLoaderProps {
  phase?: "checking" | "loading";
  serverName?: string;
  attempt?: number;
  total?: number;
}

const ServerLoader = ({
  phase = "loading",
  serverName,
  attempt = 1,
  total = 1,
}: ServerLoaderProps) => {
  return (
    <div className="bg-logo-black/85 absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-6 text-center backdrop-blur-sm">
      {total > 1 && (
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {Array.from({ length: total }, (_, index) => {
            const isActive = index === attempt - 1;
            const isPassed = index < attempt - 1;

            return (
              <span
                key={index}
                className={cn(
                  "rounded-xs transition-all duration-300",
                  isActive
                    ? "bg-logo-blue size-2"
                    : isPassed
                      ? "bg-logo-white/15 size-1.5"
                      : "bg-logo-white/30 size-1.5",
                )}
              />
            );
          })}
        </div>
      )}

      <div className="flex flex-col items-center gap-2">
        <p className="text-logo-white/60 text-[clamp(.8rem,3.2vw,.9rem)]">
          {phase === "checking"
            ? "Finding a working server"
            : "Starting playback"}
        </p>
        {serverName && (
          <p className="text-logo-white/40 flex items-center gap-2 text-[clamp(.72rem,2.8vw,.82rem)]">
            <FaServer className="text-logo-blue" />
            {serverName}
          </p>
        )}
      </div>
    </div>
  );
};

export default ServerLoader;
