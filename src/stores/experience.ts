import { create } from "zustand";

export type SortOption = "updated-desc" | "updated-asc" | "created-desc" | "created-asc";

export const sortLabels: Record<SortOption, string> = {
  "updated-desc": "업데이트 최신순",
  "updated-asc": "업데이트 오래된순",
  "created-desc": "생성 최신순",
  "created-asc": "생성 오래된순",
};

interface ExperienceStore {
  postId: string | null;
  postTitle: string;
  setPostId: (postId: string | null, title?: string) => void;
  articleId: string | null;
  setArticleId: (articleId: string | null) => void;
  sort: SortOption;
  setSort: (sort: SortOption) => void;
  showSortMenu: boolean;
  setShowSortMenu: (show: boolean) => void;
}

export const useExperienceStore = create<ExperienceStore>((set) => ({
  postId: null,
  postTitle: "",
  setPostId: (postId, title) => set({ postId, postTitle: title ?? "", articleId: null }),
  articleId: null,
  setArticleId: (articleId) => set({ articleId }),
  sort: "updated-desc",
  setSort: (sort) => set({ sort, showSortMenu: false }),
  showSortMenu: false,
  setShowSortMenu: (showSortMenu) => set({ showSortMenu }),
}));
