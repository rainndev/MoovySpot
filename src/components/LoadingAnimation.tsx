import { motion } from "framer-motion";

const LoadingAnimation = () => {
  return (
    <div className="flex h-dvh w-full items-center justify-center gap-2">
      {Array.from({ length: 3 }, (_, index) => (
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: [0, -20, 0] }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            repeatType: "loop",
            delay: index * 0.1,
            ease: "easeInOut",
          }}
          key={index}
          className="bg-logo-blue h-2 w-2 rounded-md md:h-3 md:w-3"
        />
      ))}
    </div>
  );
};

export default LoadingAnimation;
