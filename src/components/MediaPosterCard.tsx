import { cn } from "@/lib/utils";
import { formatImagePath } from "@/lib/watch-utils";
import type { MediaItem, MediaType } from "@/types/TMDBTypes";
import { Link } from "@tanstack/react-router";
import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

interface MediaPosterCardProps {
  media: MediaItem;
  type?: MediaType;
  disableLink?: boolean;
  animated?: boolean;
  linkClassName?: string;
  wrapperClassName?: string;
  cardClassName?: string;
  imageWrapperClassName?: string;
  imageClassName?: string;
  imageTestId?: string;
  showOverlay?: boolean;
  topRightSlot?: ReactNode;
  children?: ReactNode;
}

const MediaPosterCard = ({
  media,
  type,
  disableLink = false,
  animated = false,
  linkClassName,
  wrapperClassName,
  cardClassName,
  imageWrapperClassName,
  imageClassName,
  imageTestId,
  showOverlay = true,
  topRightSlot,
  children,
}: MediaPosterCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, {
    amount: 0.3,
    once: true,
  });

  useEffect(() => {
    if (!animated || !inView) return;

    const delay = Math.random() * 0.2;
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.4,
        ease: "easeOut",
      },
    });
  }, [animated, controls, inView]);

  const resolvedType = type ?? media.type ?? "movie";

  if (!media.poster_path) return null;
  if (!media.title && !media.name) return null;

  const content = (
    <>
      <div
        className={cn(
          "bg-logo-black/50 relative w-full overflow-hidden rounded-lg transition-all duration-300 ease-in-out hover:shadow-xl md:rounded-2xl",
          cardClassName,
        )}
      >
        <div className={cn("w-full", imageWrapperClassName)}>
          <img
            data-testid={imageTestId}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            loading="lazy"
            src={formatImagePath(media.poster_path, "w300")}
            alt={media.title || media.name}
            draggable="false"
            className={cn(
              "aspect-[3/4] h-full w-full scale-100 object-cover opacity-90 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-50 active:scale-105 active:opacity-50",
              imageClassName,
            )}
          />
        </div>

        {topRightSlot}

        {showOverlay && (
          <div className="bg-logo-black/50 pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#14c4b4)]" />
        )}
      </div>
      {children}
    </>
  );

  return (
    <Link
      className={linkClassName}
      disabled={disableLink}
      params={{ id: String(media.id) }}
      search={{ type: resolvedType }}
      to="/details/$id"
    >
      {animated ? (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          className={cn(
            "group h-full flex-shrink-0 snap-start overflow-hidden",
            wrapperClassName,
          )}
        >
          {content}
        </motion.div>
      ) : (
        <div
          className={cn(
            "group h-full flex-shrink-0 snap-start overflow-hidden",
            wrapperClassName,
          )}
        >
          {content}
        </div>
      )}
    </Link>
  );
};

export default MediaPosterCard;
