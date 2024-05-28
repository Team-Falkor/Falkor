import CollectionDropdownItem from '@/components/info/Collection/item';
import { DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import useCollection from '@/hooks/useCollection';
import { IGDBReturnDataType } from '@/utils/api/igdb/types';
import { PlusIcon } from 'lucide-react';
import { FC, useEffect, useState } from 'react';

interface CollectionDropdownContentProps {
  game: IGDBReturnDataType;
}

const CollectionDropdownContent: FC<CollectionDropdownContentProps> = ({ game }) => {
  const { getCollectionNames } = useCollection();
  const [collections, setCollections] = useState<string[]>([]);

  useEffect(() => {
    getCollectionNames().then((res) => {
      setCollections(res);
    });
  }, []);

  return (
    <DropdownMenuContent className="max-w-sm">
      <DropdownMenuLabel className="w-full truncate">Add to Collection: {game.name}</DropdownMenuLabel>

      <DropdownMenuSeparator />

      <div className="overflow-y-auto max-h-24">
        {!collections?.length ? (
          <div className="flex items-center justify-center gap-2 p-2">
            <p className="text-center">No collections found! Create a new one</p>
          </div>
        ) : (
          collections.map((collection) => (
            <CollectionDropdownItem
              key={collection}
              collectionName={collection}
              game={game}
            />
          ))
        )}
      </div>

      <DropdownMenuSeparator />

      <DropdownMenuItem>
        <DialogTrigger>
          <div className="flex items-center gap-1.5">
            <PlusIcon className="size-5" />
            <p className="text-sm">Create a new collection</p>
          </div>
        </DialogTrigger>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default CollectionDropdownContent;
