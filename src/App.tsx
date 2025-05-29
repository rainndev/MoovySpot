import Homepage from "./pages/Homepage";
import Navigation from "./pages/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WatchVideoContainer from "./pages/WatchVideoContainer";
import BottomNav from "./components/BottomNav";
import Watchlist from "./pages/Watchlist";
import RecentView from "./pages/RecentView";
import { useSearchModalStore } from "./store/SearchModalStore";
import SearchModal from "./components/SearchModal";

const App = () => {
  const isSearchOpen = useSearchModalStore((state) => state.isOpen);
  return (
    <Router>
      {isSearchOpen && <SearchModal />}
      <div className="hide-scrollbar bg-logo-black text-logo-white h-dvh">
        <Navigation />
        <BottomNav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/recent" element={<RecentView />} />
          <Route path="/watch/:id" element={<WatchVideoContainer />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
