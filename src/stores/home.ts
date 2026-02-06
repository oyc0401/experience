import { create } from "zustand";

interface HomeStore {
  subView: "history" | null;
  setSubView: (subView: "history" | null) => void;
}

export const useHomeStore = create<HomeStore>((set) => ({
  subView: null,
  setSubView: (subView) => set({ subView }),
}));
