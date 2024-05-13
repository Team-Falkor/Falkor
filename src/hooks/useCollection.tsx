import { IGDBReturnDataType } from '@/utils/api/igdb/types';
import { collectionsStoreHandler } from '@/utils/stores/collections';
import { useRef } from 'react';

const useCollection = (collectionName?: string) => {
  const collection = useRef(collectionsStoreHandler);

  const addToCollection = async (game: IGDBReturnDataType) => {
    if (!collectionName) return;
    await collection.current.addGameToCollection(collectionName, game);
  };

  const removeFromCollection = async (game: IGDBReturnDataType) => {
    if (!collectionName) return collectionError();
    await collection.current.removeGameFromCollection(collectionName, game);
  };

  const getCollection = async () => {
    if (!collectionName) return collectionError();
    return await collection.current.getCollection(collectionName);
  };

  const isGameInCollection = async (game: IGDBReturnDataType) => {
    if (!collectionName) return collectionError();
    return await collection.current.isGameInCollection(collectionName, game.id);
  };

  const getCollectionNames = async () => {
    return await collection.current.getCollectionNames();
  };

  return {
    isGameInCollection,
    addToCollection,
    removeFromCollection,
    getCollection,
    getCollectionNames,
  };
};

const collectionError = () => {
  throw new Error('You have not selected a collection id! ');
};

export default useCollection;
