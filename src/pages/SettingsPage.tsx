import { useSettingsStore } from "@/store/SettingsStore";
import { useEffect, useState } from "react";

const SettingsPage = () => {
  const customCursorEnabled = useSettingsStore(
    (state) => state.customCursorEnabled,
  );
  const setCustomCursorEnabled = useSettingsStore(
    (state) => state.setCustomCursorEnabled,
  );
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateViewport = () => setIsDesktop(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col p-3 pb-20 md:px-10 md:pt-28 md:pb-10">
      <header className="mt-5 mb-10 w-full">
        <h1 className="font-[ClashDisplay] text-[clamp(1.3rem,3vw,2rem)] font-medium">
          Settings
        </h1>
      </header>

      <section
        className={`border-logo-white/10 rounded-2xl border p-5 md:p-6 ${isDesktop ? "bg-logo-white/5" : "bg-logo-white/[0.025] opacity-60"}`}
      >
          <div className="flex items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-[ClashDisplay] text-lg font-medium">
                  Custom cursor
                </h2>
                {!isDesktop && (
                  <span className="border-logo-white/10 bg-logo-white/5 text-logo-white/50 rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold tracking-wider uppercase">
                    Desktop only
                  </span>
                )}
              </div>
              <p className="text-logo-white/50 mt-1 max-w-md font-[SansationLight] text-sm">
                Use the animated popcorn cursor on desktop devices.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={customCursorEnabled}
              aria-label="Custom cursor"
              data-testid="custom-cursor-switch"
              disabled={!isDesktop}
              onClick={() => setCustomCursorEnabled(!customCursorEnabled)}
              className={`relative h-7 w-12 shrink-0 overflow-hidden rounded-full transition-colors disabled:cursor-not-allowed ${isDesktop && customCursorEnabled ? "bg-logo-blue" : "bg-logo-white/20"}`}
            >
              <span
                className={`absolute top-1 left-1 size-5 rounded-full bg-white shadow transition-transform duration-200 ${isDesktop && customCursorEnabled ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
          </div>
      </section>
    </main>
  );
};

export default SettingsPage;
