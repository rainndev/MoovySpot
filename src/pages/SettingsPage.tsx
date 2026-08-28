import { useSettingsStore } from "@/store/SettingsStore";
import { useIsDesktop } from "@/hooks/use-media-query";

const SettingsPage = () => {
  const customCursorEnabled = useSettingsStore(
    (state) => state.customCursorEnabled,
  );
  const setCustomCursorEnabled = useSettingsStore(
    (state) => state.setCustomCursorEnabled,
  );
  const lowPowerModeEnabled = useSettingsStore(
    (state) => state.lowPowerModeEnabled,
  );
  const setLowPowerModeEnabled = useSettingsStore(
    (state) => state.setLowPowerModeEnabled,
  );
  const isDesktop = useIsDesktop();
  const isCustomCursorActive = isDesktop && customCursorEnabled;

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col p-3 pb-20 md:px-10 md:pt-28 md:pb-10">
      <header className="mt-5 mb-10 w-full">
        <h1 className="font-[ClashDisplay] text-[clamp(1.3rem,3vw,2rem)] font-medium">
          Settings
        </h1>
      </header>

      <div className="space-y-3">
        <section
          className={`border-logo-white/10 rounded-2xl border p-5 md:p-6 ${isDesktop ? "bg-logo-white/5" : "bg-logo-white/[0.025] opacity-60"}`}
        >
          <div className="flex items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-[ClashDisplay] text-base font-medium sm:text-lg">
                  Custom cursor
                </h2>
                {!isDesktop && (
                  <span className="border-logo-white/10 bg-logo-white/5 text-logo-white/50 rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold tracking-wider uppercase">
                    Desktop only
                  </span>
                )}
              </div>
              <p className="text-logo-white/50 mt-1 max-w-md font-[SansationLight] text-xs sm:text-sm">
                Use the animated popcorn cursor on desktop devices.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={isCustomCursorActive}
              aria-label="Custom cursor"
              data-testid="custom-cursor-switch"
              disabled={!isDesktop}
              onClick={() => setCustomCursorEnabled(!customCursorEnabled)}
              className={`relative h-7 w-12 shrink-0 overflow-hidden rounded-full transition-colors disabled:cursor-not-allowed ${isCustomCursorActive ? "bg-logo-blue" : "bg-logo-white/20"}`}
            >
              <span
                className={`absolute top-1 left-1 size-5 rounded-full bg-white shadow transition-transform duration-200 ${isCustomCursorActive ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
          </div>
        </section>

        <section className="border-logo-white/10 bg-logo-white/5 rounded-2xl border p-5 md:p-6">
          <div className="flex items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-[ClashDisplay] text-base font-medium sm:text-lg">
                  Low Power Mode
                </h2>
              </div>
              <p className="text-logo-white/50 mt-1 max-w-lg font-[SansationLight] text-xs sm:text-sm">
                Reduces motion and graphics for televisions, low-memory
                hardware, and other low-power devices.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={lowPowerModeEnabled}
              aria-label="Low Power Mode"
              data-testid="low-power-mode-switch"
              onClick={() => setLowPowerModeEnabled(!lowPowerModeEnabled)}
              className={`relative h-7 w-12 shrink-0 overflow-hidden rounded-full transition-colors ${lowPowerModeEnabled ? "bg-logo-blue" : "bg-logo-white/20"}`}
            >
              <span
                className={`absolute top-1 left-1 size-5 rounded-full bg-white shadow transition-transform duration-200 ${lowPowerModeEnabled ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SettingsPage;
