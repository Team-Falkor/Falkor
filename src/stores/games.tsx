import { create } from 'zustand';

type isGameRunning = {
  isGameRunning: boolean;
  runningId: number | null;
  setIsGameRunning: (isGameRunning: boolean, runningId: number | null) => void;
};

export const useIsGameRunning = create<isGameRunning>((set) => ({
  isGameRunning: false,
  runningId: null,
  setIsGameRunning: (isGameRunning, runningId) => set({ isGameRunning, runningId }),
}));
