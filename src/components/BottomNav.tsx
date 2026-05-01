import { navigationOptions, type NavigationSlug } from "@/data/navigation-data";
import { useSearchModalStore } from "@/store/SearchModalStore";
import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "motion/react";
import { createElement, useState } from "react";
import { IoSearch } from "react-icons/io5";

const BottomNav = () => {
  const isSearchOpen = useSearchModalStore((state) => state.isOpen);
  const toggleSearchModal = useSearchModalStore((state) => state.toggleModal);
  const location = useLocation();
  const pathname = location.pathname;
  const [selectedOption, setSelectedOption] = useState<NavigationSlug>(
    pathname as NavigationSlug,
  );

  return (
    <div className="bg-logo-black/50 border-logo-blue/20 fixed bottom-0 left-0 z-20 w-full overflow-hidden rounded-tl-3xl rounded-tr-3xl border-t backdrop-blur-lg md:hidden">
      <ul className="text-logo-white flex w-full justify-between px-8 py-5 text-xl">
        {navigationOptions.map(({ slug, icon }) => (
          <Link to={slug} key={slug} onClick={() => setSelectedOption(slug)}>
            <motion.li
              initial={{ opacity: 0.9, y: 0 }}
              whileHover={{ scale: 1.1, opacity: 1 }}
              whileTap={{ scale: 0.9, rotate: 10 }}
              className={`hover:text-logo-blue cursor-pointer ${selectedOption === slug && "navigation-active"}`}
            >
              {createElement(icon)}
            </motion.li>
          </Link>
        ))}

        <li
          onClick={() => {
            toggleSearchModal();
          }}
          className={`${isSearchOpen && "text-logo-blue"} hover:text-logo-blue cursor-pointer`}
        >
          <IoSearch />
        </li>
      </ul>
    </div>
  );
};

export default BottomNav;
