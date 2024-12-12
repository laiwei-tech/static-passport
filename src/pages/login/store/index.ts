import { create } from "zustand";

interface LoginStore {
  isWrapLoading: boolean;
  setIsWrapLoading: (isWrapLoading: boolean) => void;
  action: string;
  setAction: (action: string) => void;
  refreshUserInfo: () => void;
  setRefreshUserInfo: (refreshUserInfo: () => void) => void;
}

export const loginStore = create<LoginStore>((set) => ({
  isWrapLoading: false,
  setIsWrapLoading: (isWrapLoading: boolean) => set({ isWrapLoading }),
  action: '',
  setAction: (action: string) => set({ action }),
  refreshUserInfo: () => {},
  setRefreshUserInfo: (refreshUserInfo: () => void) => set({ refreshUserInfo }),
}));
