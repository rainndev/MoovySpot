const Hero = () => {
  return (
    <div className="flex h-full max-w-7xl flex-col items-center justify-center p-5 md:p-30">
      {/* Title`` */}
      <div className="text-center text-pretty">
        <h1 className="font-[ClashDisplay] text-[clamp(2rem,3vw,7rem)] font-semibold">
          Your Movie Night <span className="text-logo-blue">Starts Here</span>
        </h1>
        <p className="text-logo-white/75 mt-2 font-[SansationLight] text-[clamp(1rem,3vw,1.3rem)] text-pretty">
          Tired of wasting time picking what to watch? MoovySpot gives you
          trending picks, personalized lists, and curated collections—all in one
          spot
        </p>
      </div>
      {/* Search input */}
    </div>
  );
};

export default Hero;
