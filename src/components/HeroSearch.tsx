const HeroSearch = () => {
  return (
    <div className="mt-10 w-full">
      <input
        type="text"
        placeholder="Search"
        className="ring-logo-white/90 focus:ring-logo-blue bg-logo-black/10 placeholder:text-logo-white/50 focus:shadow-logo-blue/20 w-full rounded-full p-2 pl-5 font-[SansationLight] text-[clamp(.8rem,3vw,1rem)] ring-1 transition duration-300 ease-in-out outline-none focus:shadow-md md:p-3 md:pl-10"
      />
    </div>
  );
};

export default HeroSearch;
