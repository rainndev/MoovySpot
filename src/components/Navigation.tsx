import { useSearchModalStore } from "@/store/SearchModalStore";
import { BiSearchAlt } from "react-icons/bi";
import { RiMovie2AiFill } from "react-icons/ri";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { navigationOptions } from "@/data/navigation-data";
import { createElement } from "react";

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
            {navigationOptions.map(({ slug, icon }) => (
              <Link to={slug} key={slug}>
                <motion.li
                  initial={{ opacity: 0.9, y: 0 }}
                  whileHover={{ scale: 1.1, opacity: 1 }}
                  whileTap={{ scale: 0.9, rotate: 10 }}
                  className="hover:text-logo-blue cursor-pointer"
                >
                  {createElement(icon)}
                </motion.li>
              </Link>
            ))}
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
