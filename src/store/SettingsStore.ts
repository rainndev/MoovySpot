import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsStore {
  customCursorEnabled: boolean;
  lowPowerModeEnabled: boolean;
  setCustomCursorEnabled: (enabled: boolean) => void;
  setLowPowerModeEnabled: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      customCursorEnabled: true,
      lowPowerModeEnabled: false,
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
    },
  ),
);
