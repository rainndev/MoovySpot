import React from "react";

const Navigation = () => {
  return (
    <header className="flex justify-between items-center w-full bg-logo-text/20 p-5">
      {/* logo */}
      <div>Logo</div>
      {/* nav links */}
      <div>
        <ul className="flex items-center space-x-10">
          <li>Home</li>
          <li>Tv Shows</li>
          <li>Movies</li>
          <li>Upcoming</li>
        </ul>
      </div>
      {/* Search bar */}
      <div>Search</div>
    </header>
  );
};

export default Navigation;
