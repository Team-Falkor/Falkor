import { IGDBReturnDataType } from '@/utils/api/igdb/types';
import { collectionsStore } from '@/utils/stores';
import { gameDataStoreHelper } from '@/utils/stores/gameData';

interface Collection {
  id: number;
  name: string;
  games: number[];
  createdAt: string;
  updatedAt: string;
}

class CollectionsStoreHandler {
  private collections = collectionsStore;
  private gameStoreHelper = gameDataStoreHelper;

  async createCollection(name: string, games?: number[]) {
    const newCollection: Collection = {
      id: Date.now(),
      name,
      games: games ?? [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await this.collections.set(name, newCollection);
  }

  async addGameToCollection(collectionName: string, gameData: IGDBReturnDataType) {
    const collection = await this.collections.get<Collection>(collectionName);

    if (!collection) {
      console.log(`cannot find a collection with name ${collectionName}`);
      return;
    }

    await this.gameStoreHelper.setGame(gameData.id, gameData);

    collection.games.push(gameData.id);
    collection.updatedAt = new Date().toISOString();

    await this.collections.set(collectionName, collection);
  }

  async removeGameFromCollection(collectionName: string, gameData: IGDBReturnDataType) {
    const collection = await this.collections.get<Collection>(collectionName);

    if (!collection) {
      console.log(`cannot find a collection with name ${collectionName}`);
      return;
    }

    collection.games = collection.games.filter((id) => id !== gameData.id);
    collection.updatedAt = new Date().toISOString();

    await this.collections.set(collectionName, collection);
  }

  async deleteCollection(collectionName: string) {
    await this.collections.delete(collectionName);
  }

  async getCollections() {
    return await this.collections.values();
  }

  async getCollectionNames() {
    return await this.collections.keys();
  }

  async getCollection(collectionName: string) {
    return await this.collections.get<Collection>(collectionName);
  }
}

export const collectionsStoreHandler = new CollectionsStoreHandler();
