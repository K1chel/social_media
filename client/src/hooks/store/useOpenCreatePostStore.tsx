import { create } from "zustand";

interface OpenCreatePostStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useOpenCreatePostStore = create<OpenCreatePostStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
