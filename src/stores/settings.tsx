<<<<<<< HEAD
=======
import { RealDebridUser } from '@/@types';
import { RealDebridSettings } from '@/hooks/useRealDebridLogin/utils';
>>>>>>> main
import { create } from 'zustand';

type OS = {
  platform: 'windows' | 'macos' | 'linux' | 'unknown';
  setPlatform: (platform: 'windows' | 'macos' | 'linux' | 'unknown') => void;
};

export const useOS = create<OS>((set) => ({
  platform: 'unknown',
  setPlatform: (platform) => set({ platform }),
}));
<<<<<<< HEAD
=======

type RealDebrid = {
  realDebridSettings: RealDebridSettings | null;
  setRealDebridSettings: (realDebridSettings: RealDebridSettings) => void;

  userInfo: RealDebridUser | null;
  setUserInfo: (userInfo: RealDebridUser) => void;
};

export const useRealDebridStore = create<RealDebrid>((set) => ({
  realDebridSettings: null,
  setRealDebridSettings: (realDebridSettings) => set({ realDebridSettings }),

  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
}));
>>>>>>> main
