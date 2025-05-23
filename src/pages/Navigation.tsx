import { BiSearchAlt } from "react-icons/bi";
import { RiMovie2AiFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="bg-logo-black/5 border-logo-white/20 fixed top-0 left-0 z-20 hidden w-full items-center justify-center border-b p-5 backdrop-blur-xs md:flex">
      <header className="flex w-full max-w-7xl items-center justify-between">
        {/* logo */}
        <div className="flex items-center font-bold">
          <p>MoovySpot</p>
          <span className="text-logo-blue ml-2 text-2xl">
            <RiMovie2AiFill />
          </span>
        </div>
        {/* nav links */}
        <div>
          <ul className="text-logo-white flex items-center space-x-10">
            <NavLink to="/">
              <li className="hover:text-logo-blue cursor-pointer">Home</li>
            </NavLink>
            <NavLink to="/watchlist">
              <li className="hover:text-logo-blue cursor-pointer">
                Watch List
              </li>
            </NavLink>

            <NavLink to="/recent">
              <li className="hover:text-logo-blue cursor-pointer">Recent</li>
            </NavLink>
          </ul>
        </div>
        {/* Search bar */}
        <div className="flex items-center space-x-2">
          <div className="bg-logo-white/10 rounded-full p-2">
            <BiSearchAlt className="text-xl" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navigation;
