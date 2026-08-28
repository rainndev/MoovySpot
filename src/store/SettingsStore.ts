import { isTVBrowser } from "@/lib/tv-detection";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsStore {
  customCursorEnabled: boolean;
  lowPowerModeEnabled: boolean;
  tvAutoDetectionDone: boolean;
  setCustomCursorEnabled: (enabled: boolean) => void;
  setLowPowerModeEnabled: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      customCursorEnabled: true,
      lowPowerModeEnabled: false,
      tvAutoDetectionDone: false,
      setCustomCursorEnabled: (enabled) =>
        set({ customCursorEnabled: enabled }),
      setLowPowerModeEnabled: (enabled) =>
        set(
          enabled
            ? { lowPowerModeEnabled: true, customCursorEnabled: false }
            : { lowPowerModeEnabled: false },
        ),
    }),
    {
      name: "moovyspot-settings",
      version: 1,
      migrate: (persistedState, version) => {
        const state = persistedState as SettingsStore & {
          tvModeEnabled?: boolean;
        };

        if (version === 0 && state.tvModeEnabled !== undefined) {
          state.lowPowerModeEnabled = state.tvModeEnabled;
          delete state.tvModeEnabled;
        }

        return state;
      },
      onRehydrateStorage: () => (state) => {
        if (state?.tvAutoDetectionDone) return;

        queueMicrotask(() => {
          useSettingsStore.setState({ tvAutoDetectionDone: true });

          if (isTVBrowser()) {
            useSettingsStore.getState().setLowPowerModeEnabled(true);
          }
        });
      },
    },
  ),
);
