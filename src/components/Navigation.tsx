import { navigationOptions, type NavigationSlug } from "@/data/navigation-data";
import { useSearchModalStore } from "@/store/SearchModalStore";
import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "motion/react";
import { createElement, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { RiMovie2AiFill } from "react-icons/ri";

const Navigation = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const toggleModal = useSearchModalStore((state) => state.toggleModal);
  const isSearchOpen = useSearchModalStore((state) => state.isOpen);
  const [selectedOption, setSelectedOption] = useState<NavigationSlug>(
    pathname as NavigationSlug,
  );

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
              <Link
                to={slug}
                key={slug}
                onClick={() => setSelectedOption(slug)}
              >
                <motion.li
                  initial={{ opacity: 0.9, y: 0 }}
                  whileHover={{ scale: 1.1, opacity: 1 }}
                  whileTap={{ scale: 0.9, rotate: 10 }}
                  className={`hover:text-logo-blue navigation-option cursor-pointer ${selectedOption === slug && "navigation-active"}`}
                >
                  {createElement(icon)}
                </motion.li>
              </Link>
            ))}
          </motion.ul>
        </div>
        {/* Search bar */}
        <div
          data-testid="search-button"
          onClick={() => toggleModal()}
          className="hover:bg-logo-white/10 flex cursor-pointer items-center rounded-full transition duration-300 ease-in-out"
        >
          <div
            className={`${isSearchOpen && "text-logo-blue bg-logo-blue/10"} hover:text-logo-blue text-logo-white bg-logo-blue/5 cursor-pointer rounded-full p-2`}
          >
            <IoSearch className="text-lg" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navigation;
