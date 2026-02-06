import { create } from "zustand";

export type SortOption = "updated-desc" | "updated-asc" | "created-desc" | "created-asc";

export const sortLabels: Record<SortOption, string> = {
  "updated-desc": "업데이트 최신순",
  "updated-asc": "업데이트 오래된순",
  "created-desc": "생성 최신순",
  "created-asc": "생성 오래된순",
};

interface ExperienceStore {
  folderId: number | null;
  folderTitle: string;
  setFolderId: (folderId: number | null, title?: string) => void;
  experienceId: number | null;
  setExperienceId: (experienceId: number | null) => void;
  sort: SortOption;
  setSort: (sort: SortOption) => void;
  showSortMenu: boolean;
  setShowSortMenu: (show: boolean) => void;
}

export const useExperienceStore = create<ExperienceStore>((set) => ({
  folderId: null,
  folderTitle: "",
  setFolderId: (folderId, title) =>
    set({ folderId, folderTitle: title ?? "", experienceId: null }),
  experienceId: null,
  setExperienceId: (experienceId) => set({ experienceId }),
  sort: "updated-desc",
  setSort: (sort) => set({ sort, showSortMenu: false }),
  showSortMenu: false,
  setShowSortMenu: (showSortMenu) => set({ showSortMenu }),
}));
