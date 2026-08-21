import { navigationOptions, type NavigationSlug } from "@/data/navigation-data";
import { useSearchModalStore } from "@/store/SearchModalStore";
import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { createElement, useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { RiMovie2AiFill } from "react-icons/ri";

const SCROLL_ENTER = 32; // px scrolled before we switch to "scrolled" state
const SCROLL_EXIT = 12; // px scrolled before we switch back — creates hysteresis

const Navigation = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const toggleModal = useSearchModalStore((state) => state.toggleModal);
  const isSearchOpen = useSearchModalStore((state) => state.isOpen);
  const [selectedOption, setSelectedOption] = useState<NavigationSlug>(
    pathname as NavigationSlug,
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(isScrolled);
  const rafId = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    isScrolledRef.current = isScrolled;
  }, [isScrolled]);

  useEffect(() => {
    const scrollContainer = document.querySelector<HTMLElement>(
      "[data-scroll-container]",
    );
    const scrollTarget = scrollContainer ?? window;

    const readScrollTop = () =>
      scrollContainer ? scrollContainer.scrollTop : window.scrollY;

    const updateScrollState = () => {
      rafId.current = null;
      const scrollTop = readScrollTop();
      const wasScrolled = isScrolledRef.current;

      // Hysteresis: different thresholds for entering vs exiting the
      // "scrolled" state so hovering near the boundary can't flip it
      // back and forth every frame.
      if (!wasScrolled && scrollTop > SCROLL_ENTER) {
        setIsScrolled(true);
      } else if (wasScrolled && scrollTop < SCROLL_EXIT) {
        setIsScrolled(false);
      }
    };

    const onScroll = () => {
      // Coalesce rapid scroll events into one state check per frame.
      if (rafId.current == null) {
        rafId.current = requestAnimationFrame(updateScrollState);
      }
    };

    updateScrollState();
    scrollTarget.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      scrollTarget.removeEventListener("scroll", onScroll);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="fixed top-5 left-1/2 z-50 hidden -translate-x-1/2 md:block">
      <motion.header
        layout
        initial={false}
        animate={
          shouldReduceMotion
            ? undefined
            : { width: isScrolled ? "auto" : "min(82vw, 36rem)" }
        }
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="bg-logo-black/65 border-logo-white/5 flex items-center gap-1 rounded-full border p-3 shadow-[0_10px_35px_rgba(0,0,0,0.35)] backdrop-blur-xl"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {!isScrolled && (
            <motion.div
              initial={{ opacity: 0, width: 0, x: -12 }}
              animate={{ opacity: 1, width: "auto", x: 0 }}
              exit={{ opacity: 0, width: 0, x: -12 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="text-logo-blue flex min-w-0 items-center gap-2 overflow-hidden pl-2"
            >
              <RiMovie2AiFill className="shrink-0 text-2xl" />
            </motion.div>
          )}
        </AnimatePresence>

        <nav aria-label="Primary navigation" className="shrink-0 grow">
          <motion.ul className="text-logo-white flex items-center justify-center gap-1 text-lg">
            {navigationOptions.map(({ name, slug, icon }) => (
              <Link
                to={slug}
                key={slug}
                onClick={() => setSelectedOption(slug)}
                aria-label={name}
                className="group"
              >
                <motion.li
                  initial={{ opacity: 0.85, scale: 1 }}
                  whileHover={{ scale: 1.08, opacity: 1 }}
                  whileTap={{ scale: 0.92 }}
                  className={`flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 ${selectedOption === slug ? "navigation-active bg-logo-blue/15" : "hover:bg-logo-white/10 hover:text-logo-blue"}`}
                >
                  {createElement(icon)}
                </motion.li>
              </Link>
            ))}
          </motion.ul>
        </nav>

        <motion.button
          layout
          type="button"
          data-testid="search-button"
          onClick={() => toggleModal()}
          aria-label="Search"
          className={`${isSearchOpen ? "text-logo-blue bg-logo-blue/15" : "text-logo-white hover:bg-logo-white/10 hover:text-logo-blue"} flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-300`}
        >
          <IoSearch className="text-lg" />
        </motion.button>
      </motion.header>
    </div>
  );
};

export default Navigation;
