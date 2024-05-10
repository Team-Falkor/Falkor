import DownloadDialogMagnetContent from '@/components/sideNavigation/downloads/dialogs/magnet';
import DownloadDialogTorrentContent from '@/components/sideNavigation/downloads/dialogs/torrent';
<<<<<<< HEAD
=======
import SideNavigationDownloadItem from '@/components/sideNavigation/downloads/item';
>>>>>>> main
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { PopoverContent } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent } from '@/components/ui/tooltip';
import useTorrentList from '@/hooks/useTorrentList';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { MagnetIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

const SideNavigationDownloadsPopoverContent = () => {
  const { list: downloads } = useTorrentList();
  const [magnetDialogOpen, setMagnetDialogOpen] = useState<boolean | undefined>(undefined);
  const [torrentDialogOpen, setTorrentDialogOpen] = useState<boolean | undefined>(undefined);

  return (
    <PopoverContent
      side="right"
      className="w-[450px]"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Downloads</h1>

          <div className="flex items-center gap-2">
            <Tooltip>
<<<<<<< HEAD
              <Dialog>
=======
              <Dialog
                open={torrentDialogOpen}
                onOpenChange={setTorrentDialogOpen}
              >
>>>>>>> main
                <DialogTrigger>
                  <TooltipTrigger>
                    <Button
                      variant="ghost"
                      size="icon"
                    >
                      <PlusIcon className="size-6" />
                    </Button>
                  </TooltipTrigger>
                </DialogTrigger>

<<<<<<< HEAD
                <DownloadDialogTorrentContent />
=======
                <DownloadDialogTorrentContent setOpen={setTorrentDialogOpen} />
>>>>>>> main
                <TooltipContent>Add from .torrent</TooltipContent>
              </Dialog>
            </Tooltip>

            <Tooltip>
<<<<<<< HEAD
              <Dialog>
=======
              <Dialog
                open={magnetDialogOpen}
                onOpenChange={setMagnetDialogOpen}
              >
>>>>>>> main
                <DialogTrigger>
                  <TooltipTrigger>
                    <Button
                      variant="ghost"
                      size="icon"
                    >
                      <MagnetIcon className="size-6" />
                    </Button>
                  </TooltipTrigger>
                </DialogTrigger>

<<<<<<< HEAD
                <DownloadDialogMagnetContent />
=======
                <DownloadDialogMagnetContent setOpen={setMagnetDialogOpen} />
>>>>>>> main
                <TooltipContent>Add from magnet link</TooltipContent>
              </Dialog>
            </Tooltip>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          {!downloads?.length ? (
            <div className="flex items-center justify-center py-2">
              <p className="text-sm text-muted-foreground">There currently are no downloads</p>
            </div>
          ) : (
            downloads.map((download) => (
              <SideNavigationDownloadItem
                key={download.id}
                id={download.id}
              />
            ))
          )}
        </div>
      </div>
    </PopoverContent>
  );
};

export default SideNavigationDownloadsPopoverContent;
