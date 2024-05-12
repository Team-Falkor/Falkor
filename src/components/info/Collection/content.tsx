import CollectionDropdownItem from '@/components/info/Collection/item';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

const CollectionDropdownContent = () => {
  let [checked, setChecked] = useState(false);

  return (
    <DropdownMenuContent className="max-w-sm">
      <DropdownMenuLabel>Add to Collection</DropdownMenuLabel>

      <DropdownMenuSeparator />

      <ScrollArea className="h-24">
        <CollectionDropdownItem
          checked={checked}
          setChecked={() => {
            setChecked(!checked);
          }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor dicta doloremque obcaecati? Cumque aut quae
          voluptatibus tempore consectetur iusto esse quidem nulla animi rerum, adipisci reprehenderit doloribus sint
          inventore sequi?
        </CollectionDropdownItem>
        <CollectionDropdownItem
          checked={false}
          setChecked={() => {
            console.log('checked');
          }}
        >
          List 2
        </CollectionDropdownItem>
      </ScrollArea>

      <DropdownMenuSeparator />

      <DropdownMenuItem>Create a new collection</DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default CollectionDropdownContent;
