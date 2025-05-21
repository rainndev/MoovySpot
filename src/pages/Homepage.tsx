import Popular from "@/components/Popular";
import Search from "@/components/Search";
import { ThreeDMarqueeBG } from "@/components/ThreeDMarqueeBG";

const Homepage = () => {
  return (
    <div className="h-full w-full">
      <ThreeDMarqueeBG />
      <div className="bg-logo-blue/2 absolute top-0 left-0 h-full w-full">
        <div className="from-logo-blue/5 flex h-full w-full flex-col items-center justify-center bg-gradient-to-t from-5% to-transparent">
          <Search />
        </div>
      </div>

      {/* Movies */}
      <div className="bg-logo-black relative flex min-h-screen w-full flex-col justify-center overflow-hidden p-2 md:p-10">
        {/* background */}

        <div className="bg-logo-blue/2 from-logo-blue/5 pointer-events-none absolute top-0 left-0 h-full w-full bg-gradient-to-b from-5% to-transparent" />

        <Popular type="movie" title_header="Popular Movies" />
        <Popular type="tv" title_header="Popular Show" />
      </div>
    </div>
  );
};

export default Homepage;
