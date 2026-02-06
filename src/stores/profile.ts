import { create } from "zustand";

type SubPage = "billing" | null;

interface ProfileStore {
  subPage: SubPage;
  setSubPage: (subPage: SubPage) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  subPage: null,
  setSubPage: (subPage) => set({ subPage }),
}));
