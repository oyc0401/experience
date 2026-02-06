import { create } from "zustand";

export type PageId = "home" | "experience" | "profile";

interface NavigationStore {
  pageId: PageId;
  scrollPositions: Record<PageId, number>;
  setPageId: (pageId: PageId) => void;
  saveScroll: (pageId: PageId, position: number) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  pageId: "home",
  scrollPositions: { home: 0, experience: 0, profile: 0 },
  setPageId: (pageId) => set({ pageId }),
  saveScroll: (pageId, position) =>
    set((s) => ({ scrollPositions: { ...s.scrollPositions, [pageId]: position } })),
}));
