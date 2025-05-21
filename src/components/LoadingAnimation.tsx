import { motion } from "framer-motion";

const LoadingAnimation = () => {
  return (
    <div className="flex h-full w-full items-center justify-center space-x-2">
      {Array.from({ length: 3 }, (_, index) => (
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: [0, -20, 0] }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "loop",
            delay: index * 0.2,
            ease: "easeInOut",
          }}
          key={index}
          className="bg-logo-blue h-5 w-5 rounded-md"
        />
      ))}
    </div>
  );
};

export default LoadingAnimation;
