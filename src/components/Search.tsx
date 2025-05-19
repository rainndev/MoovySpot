const Search = () => {
  return (
    <div className="flex h-full max-w-7xl flex-col items-center justify-center p-10">
      {/* Title`` */}
      <div className="text-center text-pretty">
        <h1 className="font-[ClashDisplay] text-[clamp(2rem,3vw,5rem)] font-semibold">
          Your Movie Night <span className="text-logo-blue">Starts Here</span>
        </h1>
        <p className="text-logo-white/75 mt-2 font-[SansationLight] text-[clamp(1rem,3vw,1.25rem)] text-pretty">
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
          className="ring-logo-white/90 focus:ring-logo-blue bg-logo-black/10 placeholder:text-logo-white/50 focus:shadow-logo-blue/20 w-full rounded-full p-2 pl-5 font-[SansationLight] text-[clamp(.8rem,3vw,1rem)] ring-1 transition duration-300 ease-in-out outline-none focus:shadow-md md:p-3 md:pl-10"
        />
      </div>
    </div>
  );
};

export default Search;
