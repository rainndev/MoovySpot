import { GoHomeFill } from "react-icons/go";
import { LuListVideo } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { MdHistory } from "react-icons/md";

const BottomNav = () => {
  return (
    <div className="bg-logo-black/5 border-logo-blue/20 fixed bottom-0 left-0 z-20 w-full rounded-tl-3xl rounded-tr-3xl border-t backdrop-blur-lg md:hidden">
      <ul className="text-logo-white flex w-full justify-between px-8 py-5 text-xl">
        <NavLink to="/">
          <li>
            <GoHomeFill />
          </li>
        </NavLink>

        <NavLink to="/watchlist">
          <li>
            <LuListVideo />
          </li>
        </NavLink>

        <NavLink to="/recent">
          <li>
            <MdHistory />
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default BottomNav;
