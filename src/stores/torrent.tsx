import { RqbitDesktopConfig } from '@/@types';
import { create } from 'zustand';

type TorrentConfig = {
  configured: boolean;
  setConfigured: (configured: boolean) => void;

  config: RqbitDesktopConfig | null;
  setConfig: (config: RqbitDesktopConfig) => void;
};

export const useTorrentConfig = create<TorrentConfig>((set) => ({
  configured: false,
  setConfigured: (configured: boolean) => set({ configured }),

  config: null,
  setConfig: (config: RqbitDesktopConfig) => set({ config }),
}));

type ShouldCheckForTorrents = {
  shouldCheckForTorrents: boolean;
  setShouldCheckForTorrents: (shouldCheckForTorrents: boolean) => void;
};

export const useShouldCheckForTorrents = create<ShouldCheckForTorrents>((set) => ({
  shouldCheckForTorrents: false,
  setShouldCheckForTorrents: (shouldCheckForTorrents: boolean) => set({ shouldCheckForTorrents }),
}));
