import { useState } from "react";
import SearchModal from "./SearchModal";

const HeroSearch = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="mt-10 w-full">
      {isModalOpen && <SearchModal closeModal={setIsModalOpen} />}

      <input
        onClick={handleSearchClick}
        readOnly
        type="text"
        placeholder="Search"
        className="ring-logo-white/60 bg-logo-black/10 placeholder:text-logo-white/50 w-full rounded-full p-2 pl-5 font-[SansationLight] text-[clamp(.8rem,3vw,1rem)] ring-1 transition duration-300 ease-in-out outline-none md:p-3 md:pl-10"
      />
    </div>
  );
};

export default HeroSearch;
