import Favorites from "./pages/Favorites";
import Homepage from "./pages/Homepage";
import Navigation from "./pages/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="bg-logo-black text-logo-white flex h-[100dvh] w-full flex-col items-center justify-center">
        <Navigation />

        <div className="flex min-h-screen w-full items-center justify-center">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
