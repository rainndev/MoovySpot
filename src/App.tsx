import Favorites from "./pages/Favorites";
import Homepage from "./pages/Homepage";
import Navigation from "./pages/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WatchMovie from "./pages/WatchMovie";
import LoadingAnimation from "./components/LoadingAnimation";

const App = () => {
  return (
    <Router>
      <div className="bg-logo-black text-logo-white flex h-[100dvh] w-full flex-col items-center justify-center">
        <Navigation />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/watch/:id" element={<WatchMovie />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
