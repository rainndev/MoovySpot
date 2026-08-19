import { DriftWallBG } from "./DriftWallBG";
import Hero from "./Hero";

const HeroPage = () => (
  <div className="relative flex h-dvh w-full items-center justify-center">
    <DriftWallBG />

    <div className="from-logo-black to-logo-black/10 pointer-events-none absolute inset-0 bg-gradient-to-t" />

    <div className="pointer-events-none absolute flex w-full items-center justify-center">
      <Hero />
    </div>
  </div>
);

export default HeroPage;
