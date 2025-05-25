import { create } from "zustand";

interface SearchModalStore {
  isOpen: boolean;
  toggleModal: () => void;
  closeModal?: () => void;
  openModal?: () => void;
}

export const useSearchModalStore = create<SearchModalStore>((set) => ({
  isOpen: false,
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  closeModal: () => set({ isOpen: false }),
  openModal: () => set({ isOpen: true }),
}));
