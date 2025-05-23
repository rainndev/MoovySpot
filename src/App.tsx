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
      <div className="hide-scrollbar h-dvh w-full">
        <div className="text-logo-white hide-scrollbar bg-logo-black flex w-full flex-col items-center justify-center">
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
