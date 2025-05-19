const Search = () => {
  return (
    <div className="flex h-full max-w-7xl flex-col items-center justify-center p-10">
      {/* Title`` */}
      <div className="text-center text-pretty">
        <h1 className="font-[ClashDisplay] text-7xl font-semibold">
          Your Movie Night <span className="text-logo-blue">Starts Here</span>
        </h1>
        <p className="text-logo-white/75 mx-20 mt-2 font-[SansationLight] text-xl">
          Tired of wasting time picking what to watch? MoovySpot gives you
          trending picks, personalized lists, and curated collections—all in one
          spot
        </p>
      </div>
      {/* Search input */}
      <div className="mt-10 w-full">
        <input
          type="text"
          placeholder="Search"
          className="ring-logo-white/90 focus:ring-logo-blue bg-logo-black/10 placeholder:text-logo-white/50 focus:shadow-logo-blue/20 w-full rounded-full p-3 pl-10 font-[SansationLight] ring-1 transition duration-300 ease-in-out outline-none focus:shadow-md"
        />
      </div>
    </div>
  );
};

export default Search;
