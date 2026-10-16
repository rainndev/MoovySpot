import { motion } from "motion/react";

interface ServerLoaderProps {
  phase?: "checking" | "loading";
}

const ServerLoader = ({ phase = "loading" }: ServerLoaderProps) => {
  return (
    <div className="bg-logo-black/85 absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-6 text-center backdrop-blur-sm">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: 3 }, (_, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: [0, -10, 0] }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              repeatType: "loop",
              delay: index * 0.1,
              ease: "easeInOut",
            }}
            className="bg-logo-blue h-1.5 w-1.5 rounded-full"
          />
        ))}
      </div>
      <p className="text-logo-white/60 text-[clamp(.8rem,3.2vw,.9rem)]">
        {phase === "checking" ? "Finding a working server" : "Starting playback"}
      </p>
    </div>
  );
};

export default ServerLoader;
