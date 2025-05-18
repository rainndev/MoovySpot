import Search from "@/components/Search";
import { ThreeDMarqueeDemo } from "@/components/ThreeDMarqueeDemo";

const Homepage = () => {
  return (
    <div className="bg-logo-black w-full h-full">
      <ThreeDMarqueeDemo />
      <div className="absolute w-full h-full left-0 top-0 bg-logo-blue/2">
        <div className="w-full h-full bg-gradient-to-t from-5%  from-logo-blue/5 to-transparent flex items-center justify-center">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
