import { Link } from "@tanstack/react-router";
import { useSearchModalStore } from "@/store/SearchModalStore";
import { IoSearch } from "react-icons/io5";
import { navigationOptions } from "@/data/navigation-data";
import { createElement } from "react";

const BottomNav = () => {
  const isSearchOpen = useSearchModalStore((state) => state.isOpen);
  const toggleSearchModal = useSearchModalStore((state) => state.toggleModal);
  return (
    <div className="bg-logo-black/50 border-logo-blue/20 fixed bottom-0 left-0 z-20 w-full rounded-tl-3xl rounded-tr-3xl border-t backdrop-blur-lg md:hidden">
      <ul className="text-logo-white flex w-full justify-between px-8 py-5 text-xl">
        {navigationOptions.map(({ slug, icon }) => (
          <Link className="navigation-option" to={slug} key={slug}>
            <li>{createElement(icon)}</li>
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
