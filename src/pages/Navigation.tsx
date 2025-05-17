import { BiSearchAlt } from "react-icons/bi";

const Navigation = () => {
  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-center border-b border-logo-white/20   p-5 z-10">
      <header className=" flex justify-between items-center w-full   max-w-7xl">
        {/* logo */}
        <div className="font-black">MoovySpot</div>
        {/* nav links */}
        <div>
          <ul className="flex items-center space-x-10 text-logo-white">
            <li>Home</li>
            <li>Tv Shows</li>
            <li>Movies</li>
            <li>Upcoming</li>
          </ul>
        </div>
        {/* Search bar */}
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-full bg-logo-white/50">
            <BiSearchAlt className="text-xl" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navigation;
