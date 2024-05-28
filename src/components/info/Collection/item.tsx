import { DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import useCollection from '@/hooks/useCollection';
import { IGDBReturnDataType } from '@/utils/api/igdb/types';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface CollectionDropdownItemProps extends PropsWithChildren {
  collectionName: string;
  game: IGDBReturnDataType;
}

const CollectionDropdownItem: FC<CollectionDropdownItemProps> = ({ children, collectionName, game }) => {
  const { isGameInCollection, addToCollection, removeFromCollection } = useCollection(collectionName);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!collectionName) return;
    if (!game) return;

    isGameInCollection(game).then(setChecked);
  }, [isGameInCollection, game]);

  const handleSelect = async () => {
    try {
      if (checked) {
        await removeFromCollection(game);
        setChecked(false);
        toast.success('Game removed from collection');
        return;
      } else {
        await addToCollection(game);
        setChecked(true);
        toast.success('Game added to collection');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to add game to collection');
    }
  };

  return (
    <DropdownMenuCheckboxItem
      checked={checked}
      onCheckedChange={setChecked}
      onSelect={handleSelect}
    >
      <span className="truncate">{collectionName ?? children}</span>
    </DropdownMenuCheckboxItem>
  );
};

export default CollectionDropdownItem;
