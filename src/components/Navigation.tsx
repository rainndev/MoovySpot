import { useSearchModalStore } from "@/store/SearchModalStore";
import { BiSearchAlt } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import { LuListVideo } from "react-icons/lu";
import { MdHistory } from "react-icons/md";
import { RiMovie2AiFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Navigation = () => {
  const toggleModal = useSearchModalStore((state) => state.toggleModal);
  const isSearchOpen = useSearchModalStore((state) => state.isOpen);

  return (
    <div className="bg-logo-black/50 border-logo-white/20 fixed top-0 bottom-0 left-0 z-20 hidden h-full items-center justify-center border-b p-5 backdrop-blur-xs md:flex">
      <header className="flex w-full max-w-7xl flex-col items-center justify-between space-y-20">
        {/* logo */}
        <div className="flex items-center font-bold">
          <span className="text-logo-blue text-2xl">
            <RiMovie2AiFill />
          </span>
        </div>
        {/* nav links */}
        <div>
          <motion.ul className="text-logo-white flex flex-col justify-between space-y-8 text-2xl">
            <NavLink to="/">
              <motion.li
                initial={{ opacity: 0.9, y: 0 }}
                whileHover={{ scale: 1.1, opacity: 1 }}
                whileTap={{ scale: 0.9, rotate: 10 }}
                className="hover:text-logo-blue cursor-pointer"
              >
                <GoHomeFill />
              </motion.li>
            </NavLink>
            <NavLink to="/watchlist">
              <motion.li
                initial={{ opacity: 0.9, y: 0 }}
                whileHover={{ scale: 1.1, opacity: 1 }}
                whileTap={{ scale: 0.9, rotate: 10 }}
                className="hover:text-logo-blue cursor-pointer"
              >
                <LuListVideo />
              </motion.li>
            </NavLink>

            <NavLink to="/recent">
              <motion.li
                initial={{ opacity: 0.9, y: 0 }}
                whileHover={{ scale: 1.1, opacity: 1 }}
                whileTap={{ scale: 0.9, rotate: 10 }}
                className="hover:text-logo-blue cursor-pointer"
              >
                <MdHistory />
              </motion.li>
            </NavLink>
          </motion.ul>
        </div>
        {/* Search bar */}
        <div
          onClick={() => toggleModal()}
          className="hover:bg-logo-white/10 flex cursor-pointer items-center rounded-full transition duration-300 ease-in-out"
        >
          <div
            className={`${isSearchOpen && "text-logo-blue bg-logo-blue/10"} hover:text-logo-blue text-logo-white bg-logo-blue/5 cursor-pointer rounded-full p-2`}
          >
            <BiSearchAlt className="text-lg" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navigation;
