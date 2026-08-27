import BottomNav from "@/components/BottomNav";
import Navigation from "@/components/Navigation";
import PopcornCursor from "@/components/PopcornCursor";
import SearchModal from "@/components/SearchModal";
import { useSearchModalStore } from "@/store/SearchModalStore";
import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import * as React from "react";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const isSearchOpen = useSearchModalStore((state) => state.isOpen);
  const pathname = useLocation().pathname;

  useEffect(() => {
    const staticTitles: Record<string, string> = {
      "/": "MoovySpot",
      "/watchlist": "MoovySpot | Watchlist",
      "/category": "MoovySpot | Category",
      "/recent": "MoovySpot | Recently Viewed",
      "/settings": "MoovySpot | Settings",
    };

    if (staticTitles[pathname]) {
      document.title = staticTitles[pathname];
    } else if (pathname.startsWith("/details/")) {
      document.title = "MoovySpot | Details";
    } else if (pathname.startsWith("/play/")) {
      document.title = "MoovySpot | Now Playing";
    }
  }, [pathname]);

  return (
    <React.Fragment>
      <PopcornCursor />
      <AnimatePresence mode="wait">
        {isSearchOpen && <SearchModal />}
      </AnimatePresence>
      <div
        data-scroll-container
        className="hide-scrollbar bg-logo-black text-logo-white h-dvh"
      >
        <Navigation />
        <BottomNav />

        <Outlet />
      </div>
    </React.Fragment>
  );
}
