import { DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { FC, PropsWithChildren } from 'react';

interface CollectionDropdownItemProps extends PropsWithChildren {
  checked: boolean;
  setChecked: (value: boolean) => void;
}

const CollectionDropdownItem: FC<CollectionDropdownItemProps> = ({ children, checked, setChecked }) => {
  return (
    <DropdownMenuCheckboxItem
      checked={checked}
      onCheckedChange={setChecked}
    >
      <span className="truncate">{children}</span>
    </DropdownMenuCheckboxItem>
  );
};

export default CollectionDropdownItem;
