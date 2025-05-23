import { create } from "zustand";

interface WatchTypeStore {
  watchType: "movie" | "tv";
  setWatchType: (type: "movie" | "tv") => void;
}

export const useWatchTypeStore = create<WatchTypeStore>((set) => ({
  watchType: "movie",
  setWatchType: (type: "movie" | "tv") =>
    set((state) => ({ ...state, watchType: type })),
}));
