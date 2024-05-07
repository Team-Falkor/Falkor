import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { PencilLine, RefreshCcw, Trash2 } from 'lucide-react';
import { FunctionComponent } from 'react';

interface AccountsTableItemProps {
  name: string;
  email?: string;
  type: string;
  date: string;
  service: string;
  avatar?: string;
}

const AccountsTableItem: FunctionComponent<AccountsTableItemProps> = ({ avatar, date, name, service, type, email }) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center space-x-3">
          {!!avatar?.length && (
            <img
              className="rounded-full size-6"
              src={avatar}
              alt={name}
            />
          )}

          <p className="font-medium leading-none truncate text-md">
            {name}
            {!!email?.length && <span className="ml-1 text-xs text-muted-foreground">({email})</span>}
          </p>
        </div>
      </TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>{service}</TableCell>

      <TableCell className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="size-4"
        >
          <RefreshCcw />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-4"
        >
          <PencilLine />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-4"
        >
          <Trash2 />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AccountsTableItem;
