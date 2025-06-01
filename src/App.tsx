import Navigation from "@/components/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { useSearchModalStore } from "@/store/SearchModalStore";
import SearchModal from "@/components/SearchModal";
import { lazy, Suspense } from "react";
import LoadingAnimation from "./components/LoadingAnimation";

const Homepage = lazy(() => import("@/pages/HomePage"));
const WatchlistPage = lazy(() => import("@/pages/WatchlistPage"));
const RecentViewPage = lazy(() => import("@/pages/RecentViewPage"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const VideoDetailsPage = lazy(() => import("@/pages/VideoDetailsPage"));
const PlayVideoPage = lazy(() => import("@/pages/PlayVideoPage"));

const App = () => {
  const isSearchOpen = useSearchModalStore((state) => state.isOpen);
  return (
    <Router>
      {isSearchOpen && <SearchModal />}
      <div className="hide-scrollbar bg-logo-black text-logo-white h-dvh">
        <Navigation />
        <BottomNav />
        <Suspense fallback={<LoadingAnimation />}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="/recent" element={<RecentViewPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/details/:id" element={<VideoDetailsPage />} />
            <Route path="/play/:id" element={<PlayVideoPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
