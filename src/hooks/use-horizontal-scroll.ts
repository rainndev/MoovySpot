import { useRef, useCallback } from "react";

type ScrollDirection = "left" | "right";

export function useHorizontalScroll() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = useCallback((direction: ScrollDirection) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  return { scrollRef, scroll };
}
