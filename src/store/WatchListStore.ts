import type { MediaItem } from "@/types/TMDBTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WatchListStore {
  watchList: MediaItem[];
  addWatchList: (item: MediaItem) => void;
}

export const useWatchListStore = create<WatchListStore>()(
  persist(
    (set) => ({
      watchList: [] as MediaItem[],

      addWatchList: (item: MediaItem) =>
        set((state) => ({
          watchList: [...state.watchList, item],
        })),

      removeWatchList: (id: number) =>
        set((state) => ({
          watchList: state.watchList.filter((data) => data.id !== id),
        })),

      clearWatchList: () => set({ watchList: [] }),
    }),
    {
      name: "watch-list-store", // unique name for storage
      // storage: createJSONStorage(() => localStorage), // optional, defaults to localStorage
    },
  ),
);
