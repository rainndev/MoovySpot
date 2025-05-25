import { create } from "zustand";

interface SearchModalStore {
  isOpen: boolean;
  toggleModal: () => void;
}

export const useSearchModalStore = create<SearchModalStore>((set) => ({
  isOpen: false,
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));
