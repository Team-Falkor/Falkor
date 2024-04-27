import DownloadDialogPopover from '@/components/info/downloadDialog/popover';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Website } from '@/utils/api/igdb/types';
import { ChevronsRight, Download } from 'lucide-react';
import { FC, useMemo, useState } from 'react';

interface DownloadDialogProps {
  title: string;
  isReleased: boolean;
  websites: Website[];
}

const providers = [
  {
    value: 'dodi',
    label: 'Dodi Repacks',
  },
  {
    value: 'fitgirl',
    label: 'Fitgirl',
  },
  {
    value: 'steamrip',
    label: 'Steamrip',
  },
];

const DownloadDialog: FC<DownloadDialogProps> = ({ isReleased, websites }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(providers[0]);

  const stores = useMemo(() => {
    return websites.filter((website) => website.category === 13);
  }, [websites]);

  return (
    <Dialog>
      <DialogTrigger disabled={!isReleased}>
        <Button
          variant={'secondary'}
          disabled={!isReleased}
        >
          <Download className="w-4 h-4 mr-2" />
          {isReleased ? 'Download' : 'Not Released'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col w-full gap-4">
          <DialogTitle className="text-center">Select your download</DialogTitle>

          <DialogDescription className="w-full mx-auto">
            <DownloadDialogPopover
              providers={providers}
              selectedProvider={selectedProvider}
              setSelectedProvider={setSelectedProvider}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="w-full border rounded-md h-72">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Available Download Links</h4>
            <ul>
              {!!stores &&
                stores.map((store) => (
                  <li
                    className="flex flex-col items-start justify-center w-full gap-2 p-2 text-sm cursor-pointer group text-start"
                    key={store.id}
                  >
                    {new URL(store.url).hostname}
                  </li>
                ))}
            </ul>
          </div>
        </ScrollArea>

        <DialogFooter className="w-full">
          <Button
            className="items-center w-full gap-2"
            type="submit"
            variant={'secondary'}
          >
            Show All Providers
            <ChevronsRight className="mt-1 size-5 stroke-slate-300" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadDialog;
