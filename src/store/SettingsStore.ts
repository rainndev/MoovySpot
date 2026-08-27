import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsStore {
  customCursorEnabled: boolean;
  setCustomCursorEnabled: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      customCursorEnabled: true,
      setCustomCursorEnabled: (enabled) =>
        set({ customCursorEnabled: enabled }),
    }),
    { name: "moovyspot-settings" },
  ),
);
