import { motion, useReducedMotion } from "motion/react";
import { PiFilmReelFill } from "react-icons/pi";

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex h-dvh max-w-7xl flex-col items-center justify-center p-5 md:p-30">
      {/* Title`` */}
      <div className="text-center text-pretty md:pl-25">
        <h1
          data-testid="hero-title"
          className="font-[ClashDisplay] text-[clamp(2rem,3vw,7rem)] font-semibold"
        >
          Your M
          {/* The "o" in Movie is swapped for a slow-spinning film reel.
              An sr-only "o" keeps the word readable for assistive tech. */}
          <span className="sr-only">o</span>
          <span
            aria-hidden="true"
            className="relative mx-[0.03em] inline-block h-[0.72em] w-[0.72em] align-[-0.12em]"
          >
            <motion.span
              className="block h-full w-full"
              style={{ transformOrigin: "center" }}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      rotate: [0, -14, 14, -12, 12, -8, 8, 0, 0],
                    }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 1,
                      ease: "easeInOut",
                      times: [0, 0.1, 0.22, 0.34, 0.46, 0.56, 0.66, 0.82, 1],
                      repeat: Infinity,
                      repeatDelay: 1.8,
                    }
              }
            >
              <PiFilmReelFill className="text-logo-blue h-full w-full drop-shadow-[0_0_14px_rgba(20,196,180,0.45)]" />
            </motion.span>
          </span>
          vie Night <br /> <span className="text-logo-blue">Starts Here</span>
        </h1>
        <p
          data-testid="hero-description"
          className="text-logo-white/75 mt-2 font-[SansationLight] text-[clamp(1rem,3vw,1.3rem)] text-pretty"
        >
          Discover the ultimate movie night experience with our curated
          selection
        </p>
      </div>
    </div>
  );
};

export default Hero;
