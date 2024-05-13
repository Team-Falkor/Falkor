import CollectionDropdownContent from '@/components/info/Collection/content';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { IGDBReturnDataType } from '@/utils/api/igdb/types';
import { List } from 'lucide-react';
import { FC } from 'react';

interface CollectionDropdownProps {
  game: IGDBReturnDataType;
}

const CollectionDropdown: FC<CollectionDropdownProps> = ({ game }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'secondary'}
          size={'icon'}
        >
          <List className="size-5" />
        </Button>
      </DropdownMenuTrigger>

      <CollectionDropdownContent game={game} />
    </DropdownMenu>
  );
};

export default CollectionDropdown;
