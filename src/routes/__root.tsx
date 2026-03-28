import BottomNav from "@/components/BottomNav";
import Navigation from "@/components/Navigation";
import SearchModal from "@/components/SearchModal";
import { useSearchModalStore } from "@/store/SearchModalStore";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import * as React from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const isSearchOpen = useSearchModalStore((state) => state.isOpen);

  return (
    <React.Fragment>
      <AnimatePresence mode="wait">
        {isSearchOpen && <SearchModal />}
      </AnimatePresence>
      <div className="hide-scrollbar bg-logo-black text-logo-white h-dvh">
        <Navigation />
        <BottomNav />

        <Outlet />
      </div>
    </React.Fragment>
  );
}
