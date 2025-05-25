import { create } from "zustand";
import type { MediaItem } from "@/types/TMDBTypes";
import { persist } from "zustand/middleware";

interface RecentlyViewStore {
  recentlyView: MediaItem[];
  addWatch: (item: MediaItem) => void;
  removeWatch: (id: number) => void;
  clearRecentlyView: () => void;
}

export const useRecentlyViewStore = create<RecentlyViewStore>()(
  persist(
    (set) => ({
      recentlyView: [] as MediaItem[],

      addWatch: (item) =>
        set((state) =>
          // Check if the item already exists in the recently viewed list
          state.recentlyView.some((data) => data.id === item.id)
            ? { recentlyView: state.recentlyView } // If it exists, do nothing
            : { recentlyView: [...state.recentlyView, item] },
        ),

      removeWatch: (id) =>
        set((state) => ({
          recentlyView: state.recentlyView.filter((data) => data.id !== id),
        })),

      // Optionally, you can add a method to clear the recently viewed items
      clearRecentlyView: () => set(() => ({ recentlyView: [] })),
    }),
    {
      name: "recently-view-store", // unique name
      // storage: createJSONStorage(() => localStorage), // optional, defaults to localStorage
    },
  ),
);
