import { create } from 'zustand';

type IsGameRunning = {
  isGameRunning: boolean;
  runningId: string | null;
  setIsGameRunning: (isGameRunning: boolean, runningId: string | null) => void;
};

export const useIsGameRunning = create<IsGameRunning>((set) => ({
  isGameRunning: false,
  runningId: null,
  setIsGameRunning: (isGameRunning, runningId) => set({ isGameRunning, runningId }),
}));

type ShouldUpdateGamesUi = {
  shouldUpdateGamesUi: boolean;
  setShouldUpdateGamesUi: (shouldUpdateGamesUi: boolean) => void;
};

export const useShouldUpdateGamesUi = create<ShouldUpdateGamesUi>((set) => ({
  shouldUpdateGamesUi: false,
  setShouldUpdateGamesUi: (shouldUpdateGamesUi) => set({ shouldUpdateGamesUi }),
}));
