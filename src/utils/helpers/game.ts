import { open } from '@tauri-apps/api/shell';

export const launchGame = (_id: number) => {
  open('C://Games//Lightyear Frontier//LightyearFrontier.exe');
};

export const closeGame = () => {};
