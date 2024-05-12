import { RealDebridUser } from '@/@types';
import { RealDebridSettings } from '@/hooks/useRealDebridLogin/utils';
import { Store } from 'tauri-plugin-store-api';

export const settingsStore = new Store('.settings.dat');
export const gamesStore = new Store('.games.dat');
export const collectionsStore = new Store('.collections.dat');
export const gameDataStore = new Store('.game-data.dat');

export const setRealDebridData = async (credentials: RealDebridSettings) => {
  await settingsStore.set('real-debrid', credentials);
};

export const checkRealDebridData = async () => {
  const credentials = await settingsStore.get<RealDebridSettings>('real-debrid');
  if (!credentials) return null;
  return credentials;
};

export const checkRealDebridUserInfo = async () => {
  const user = await settingsStore.get<RealDebridUser>('real-debrid-user');
  if (!user) return null;
  return user;
};

export const setRealDebridUserInfo = async (user: RealDebridUser) => {
  await settingsStore.set('real-debrid-user', user);
};
