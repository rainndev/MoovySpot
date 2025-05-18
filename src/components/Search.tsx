import React from "react";

const Search = () => {
  return (
    <div className="max-w-7xl p-10 flex items-center justify-center flex-col">
      {/* Title`` */}
      <div className="text-center text-pretty">
        <h1 className="font-[ClashDisplay] font-bold text-7xl ">
          Your Movie Night <span className="text-logo-blue">Starts Here</span>
        </h1>
        <p className="text-xl mt-2 ">
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
          className="ring-1 p-3 rounded-full w-full pl-10"
        />
      </div>
    </div>
  );
};

export default Search;
