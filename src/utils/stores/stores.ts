import { Store } from 'tauri-plugin-store-api';

export const settingsStore = new Store('.settings.dat');

export const gamesStore = new Store('.games.dat');
