import { GameStoreHelper } from '@/utils/stores';
import { Command, open } from '@tauri-apps/api/shell';
import { toast } from 'sonner';

export const launchGame = async (id: string) => {
  const game = await GameStoreHelper.get(id);

  if (!game) {
    toast.error('Game not found');
    return false;
  }

  GameStoreHelper.update({ ...game, lastPlayed: new Date() });

  if (game.command) {
    const [command, ...args] = game.command.split(' ');
    new Command(command, [game.path, ...args, ...(game.args ?? [])]);
  } else await open(game.path);

  return true;
};

export const closeGame = () => {};
