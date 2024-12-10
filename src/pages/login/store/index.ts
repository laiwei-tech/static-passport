import { create } from "zustand";

interface LoginStore {
  isWrapLoading: boolean;
  setIsWrapLoading: (isWrapLoading: boolean) => void;
}

export const loginStore = create<LoginStore>((set) => ({
  isWrapLoading: false,
  setIsWrapLoading: (isWrapLoading: boolean) => set({ isWrapLoading }),
}));
