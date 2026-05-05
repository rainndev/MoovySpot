import { motion } from "motion/react";
import { IoWarningOutline } from "react-icons/io5";

interface ErrorUIProps {
  error?: string | null;
  onRetry?: () => void;
  fullHeight?: boolean;
}

const ErrorUI = ({
  error = "Something went wrong. Please try again.",
  onRetry,
  fullHeight = true,
}: ErrorUIProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center gap-4 ${fullHeight ? "min-h-screen" : "min-h-96"} w-full px-5`}
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="rounded-full bg-red-500/10 p-4"
        >
          <IoWarningOutline className="text-3xl text-red-300" />
        </motion.div>

        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="font-[ClashDisplay] text-xl font-medium text-white md:text-2xl">
            Oops! Something went wrong
          </h2>
          <p className="text-sm text-white/60 md:text-base">
            {error ||
              "Failed to load content. Please check your connection and try again."}
          </p>
        </div>

        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="bg-logo-blue text-logo-black hover:bg-logo-blue/90 mt-4 rounded-lg px-6 py-2 font-medium transition-all duration-300"
          >
            Try Again
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ErrorUI;
