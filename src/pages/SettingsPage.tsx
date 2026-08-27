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

      {isDesktop && (
        <section className="border-logo-white/10 bg-logo-white/5 rounded-2xl border p-5 md:p-6">
          <div className="flex items-center justify-between gap-6">
            <div>
              <h2 className="font-[ClashDisplay] text-lg">Custom cursor</h2>
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
              onClick={() => setCustomCursorEnabled(!customCursorEnabled)}
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${customCursorEnabled ? "bg-logo-blue" : "bg-logo-white/20"}`}
            >
              <span
                className={`absolute top-1 size-5 rounded-full bg-white shadow transition-transform ${customCursorEnabled ? "translate-x-6" : "translate-x-1"}`}
              />
            </button>
          </div>
        </section>
      )}
    </main>
  );
};

export default SettingsPage;
