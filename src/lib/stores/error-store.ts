import { create } from 'zustand';

interface ErrorState {
  lastError: Error | null;
  setLastError: (error: Error | null) => void;
}

export const useErrorStore = create<ErrorState>(set => ({
  lastError: null,
  setLastError: (error: Error | null) => set({ lastError: error }),
}));
