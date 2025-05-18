import React from "react";

const Search = () => {
  return (
    <div className="max-w-7xl p-10 flex items-center justify-center flex-col">
      {/* Title`` */}
      <div className="font-[ClashDisplay] font-bold text-7xl text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit
      </div>
      {/* Search input */}
      <div className="w-full mt-10">
        <input
          type="text"
          placeholder="Search"
          className="ring-1 p-3 rounded-full w-full "
        />
      </div>
    </div>
  );
};

export default Search;
