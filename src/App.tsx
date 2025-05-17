import React from "react";
import Homepage from "./pages/Homepage";
import Navigation from "./pages/Navigation";

const App = () => {
  return (
    <div className="w-full h-[100dvh] bg-logo-background flex flex-col items-center justify-center text-logo-text">
      <Navigation />
      <div className="h-full w-full flex items-center justify-center">
        <Homepage />
      </div>
    </div>
  );
};

export default App;
