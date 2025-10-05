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

        {/* <Suspense fallback={<LoadingAnimation />}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="/recent" element={<RecentViewPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/details/:id" element={<VideoDetailsPage />} />
            <Route path="/play/:id" element={<PlayVideoPage />} />
          </Routes>
        </Suspense> */}
      </div>
    </React.Fragment>
  );
}
