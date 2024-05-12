import CollectionDropdownContent from '@/components/info/Collection/content';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { List } from 'lucide-react';

const CollectionDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'secondary'}>
          <List className="mr-2 size-4" />
          Collection
        </Button>
      </DropdownMenuTrigger>

      <CollectionDropdownContent />
    </DropdownMenu>
  );
};

export default CollectionDropdown;
