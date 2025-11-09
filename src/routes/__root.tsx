import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { useSearchModalStore } from "@/store/SearchModalStore";
import SearchModal from "@/components/SearchModal";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const isSearchOpen = useSearchModalStore((state) => state.isOpen);

  return (
    <React.Fragment>
      {isSearchOpen && <SearchModal />}

      <div className="hide-scrollbar bg-logo-black text-logo-white h-dvh">
        <Navigation />
        <BottomNav />

        <Outlet />
      </div>
    </React.Fragment>
  );
}
