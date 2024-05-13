import { DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import useCollection from '@/hooks/useCollection';
import { IGDBReturnDataType } from '@/utils/api/igdb/types';
import { FC, PropsWithChildren, useEffect, useState } from 'react';

interface CollectionDropdownItemProps extends PropsWithChildren {
  collectionName: string;
  game: IGDBReturnDataType;
}

const CollectionDropdownItem: FC<CollectionDropdownItemProps> = ({ children, collectionName, game }) => {
  const { isGameInCollection } = useCollection(collectionName);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    isGameInCollection(game).then(setChecked);
  }, [isGameInCollection]);

  return (
    <DropdownMenuCheckboxItem
      checked={checked}
      onCheckedChange={setChecked}
    >
      <span className="truncate">{collectionName ?? children}</span>
    </DropdownMenuCheckboxItem>
  );
};

export default CollectionDropdownItem;
