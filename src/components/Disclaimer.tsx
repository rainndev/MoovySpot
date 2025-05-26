const Disclaimer = () => {
  const creatorName = import.meta.env.VITE_NAME_CREATOR;

  return (
    <div className="text-logo-white/50 mx-auto mb-20 max-w-7xl p-4 text-center font-[SansationLight] text-sm text-[clamp(.5rem,3vw,.8rem)] md:px-10">
      <p>
        MoovySpot is a personal project created solely for{" "}
        <span className="text-logo-blue">educational purposes</span>. This site
        is not intended for commercial use, and public access or distribution is
        strictly prohibited. All content is copyrighted by its respective
        owners. MoovySpot does not store any files on its servers. All media is
        hosted by third party services.
      </p>
      <br />
      <p className="text-logo-white/50 h-10 w-full text-center font-[SansationLight] text-[clamp(.5rem,3vw,.8rem)]">
        Made with &#9829; by {creatorName}
      </p>
    </div>
  );
};

export default Disclaimer;
