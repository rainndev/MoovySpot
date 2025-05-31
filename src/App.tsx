import HomePage from "@/pages/Homepage";
import Navigation from "@/components/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoDetailsPage from "@/pages/VideoDetailsPage";
import BottomNav from "@/components/BottomNav";
import WatchlistPage from "@/pages/WatchlistPage";
import RecentViewPage from "@/pages/RecentViewPage";
import { useSearchModalStore } from "@/store/SearchModalStore";
import SearchModal from "@/components/SearchModal";
import PlayVideoPage from "@/pages/PlayVideoPage";
import CategoryPage from "./pages/CategoryPage";

const App = () => {
  const isSearchOpen = useSearchModalStore((state) => state.isOpen);
  return (
    <Router>
      {isSearchOpen && <SearchModal />}
      <div className="hide-scrollbar bg-logo-black text-logo-white h-dvh">
        <Navigation />
        <BottomNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/recent" element={<RecentViewPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/details/:id" element={<VideoDetailsPage />} />
          <Route path="/play/:id" element={<PlayVideoPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
