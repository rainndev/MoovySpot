import Homepage from "./pages/Homepage";
import Navigation from "./pages/Navigation";

const App = () => {
  return (
    <div className="bg-logo-black text-logo-white flex h-[100dvh] w-full flex-col items-center justify-center">
      <Navigation />
      <div className="flex h-full w-full items-center justify-center">
        <Homepage />
      </div>
    </div>
  );
};

export default App;
