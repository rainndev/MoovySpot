import Homepage from "./pages/Homepage";
import Navigation from "./pages/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WatchVideoContainer from "./pages/WatchVideoContainer";
import BottomNav from "./components/BottomNav";
import Watchlist from "./pages/Watchlist";
import RecentWatch from "./pages/RecentWatch";

const App = () => {
  return (
    <Router>
      <div className="h-full w-full">
        <div className="bg-logo-black text-logo-white hide-scrollbar flex h-full w-full flex-col items-center">
          <Navigation />
          <BottomNav />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/recent" element={<RecentWatch />} />
            <Route path="/watch/:id" element={<WatchVideoContainer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
