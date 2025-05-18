import React from "react";

const Search = () => {
  return (
    <div className="max-w-7xl p-10 flex items-center justify-center flex-col">
      {/* Title`` */}
      <div className="text-center text-pretty">
        <h1 className="font-[ClashDisplay] font-semibold text-7xl ">
          Your Movie Night <span className="text-logo-blue">Starts Here</span>
        </h1>
        <p className="text-xl mt-2 text-logo-white/75 mx-20 font-[SansationLight]">
          Tired of wasting time picking what to watch? MoovySpot gives you
          trending picks, personalized lists, and curated collections—all in one
          spot
        </p>
      </div>
      {/* Search input */}
      <div className="w-full mt-10">
        <input
          type="text"
          placeholder="Search"
          className="font-[SansationLight] outline-none ring-1 ring-logo-white/90 p-3 rounded-full w-full pl-10  focus:ring-logo-blue focus:shadow-md transition duration-300 ease-in-out bg-logo-black/10  placeholder:text-logo-white/50 focus:shadow-logo-blue/20"
        />
      </div>
    </div>
  );
};

export default Search;
