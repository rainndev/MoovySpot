import { motion } from "motion/react";
import { FaServer } from "react-icons/fa6";

interface ServerLoaderProps {
  serverName?: string;
  phase?: "checking" | "loading";
  attempt?: number;
  total?: number;
}

const ServerLoader = ({
  serverName,
  phase = "loading",
  attempt = 1,
  total = 1,
}: ServerLoaderProps) => {
  return (
    <div className="bg-logo-black/90 absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 px-6 text-center backdrop-blur-sm">
      <div className="flex items-center gap-2">
        {Array.from({ length: 3 }, (_, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: [0, -12, 0] }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              repeatType: "loop",
              delay: index * 0.1,
              ease: "easeInOut",
            }}
            className="bg-logo-blue h-2 w-2 rounded-full md:h-2.5 md:w-2.5"
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="font-[ClashDisplay] text-logo-white text-[clamp(1rem,2.2vw,1.35rem)] font-medium">
          Finding the best available server
        </p>
        <p className="text-logo-white/50 flex items-center gap-2 text-[clamp(.72rem,1.2vw,.9rem)]">
          <FaServer className="text-logo-blue" />
          {serverName
            ? `${phase === "checking" ? "Checking" : "Trying"} ${serverName}`
            : "Please wait"}
          {total > 1 && (
            <span className="text-logo-white/30">
              · source {attempt} of {total}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ServerLoader;
