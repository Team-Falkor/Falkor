import { IGDBReturnDataType } from '@/utils/api/igdb/types';
import { gameDataStore } from '@/utils/stores';

class GameDataStoreHelper {
  private store = gameDataStore;

  async getGame(id: number): Promise<IGDBReturnDataType | null> {
    const game = await this.store.get<IGDBReturnDataType>(id.toString());
    if (!game) return null;
    return game;
  }

  async getGames(games: number[]) {
    if (games.length === 0) return [];

    const gameData = await Promise.all(
      games.map(async (id) => {
        return await this.getGame(id);
      }),
    );
    return gameData;
  }

  async setGame(id: number, game: IGDBReturnDataType) {
    await this.store.set(id.toString(), game);
  }

  async removeGame(id: number) {
    await this.store.delete(id.toString());
  }

  async clear() {
    await this.store.clear();
  }
}

export const gameDataStoreHelper = new GameDataStoreHelper();
