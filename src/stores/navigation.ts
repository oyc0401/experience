import { create } from "zustand";

export type PageId = "home" | "experience" | "profile";

interface NavigationStore {
  pageId: PageId;
  setPageId: (pageId: PageId) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  pageId: "home",
  setPageId: (pageId) => set({ pageId }),
}));
