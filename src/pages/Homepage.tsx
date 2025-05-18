import Search from "@/components/Search";
import { ThreeDMarqueeDemo } from "@/components/ThreeDMarqueeDemo";

const Homepage = () => {
  return (
    <div className="bg-logo-black h-full w-full">
      <ThreeDMarqueeDemo />
      <div className="bg-logo-blue/2 absolute top-0 left-0 h-full w-full">
        <div className="from-logo-blue/5 flex h-full w-full items-center justify-center bg-gradient-to-t from-5% to-transparent">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
