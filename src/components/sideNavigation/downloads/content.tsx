import DownloadDialogMagnetContent from '@/components/sideNavigation/downloads/dialogs/magnet';
import DownloadDialogTorrentContent from '@/components/sideNavigation/downloads/dialogs/torrent';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { PopoverContent } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent } from '@/components/ui/tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { MagnetIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

const SideNavigationDownloadsPopoverContent = () => {
  const [downloads] = useState(null);

  return (
    <PopoverContent
      side="right"
      className="w-[400px]"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Downloads</h1>

          <div className="flex items-center gap-2">
            <Tooltip>
              <Dialog>
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

                <DownloadDialogTorrentContent />
                <TooltipContent>Add from .torrent</TooltipContent>
              </Dialog>
            </Tooltip>

            <Tooltip>
              <Dialog>
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

                <DownloadDialogMagnetContent />
                <TooltipContent>Add from magnet link</TooltipContent>
              </Dialog>
            </Tooltip>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          {!downloads && (
            <div className="flex items-center justify-center py-2">
              <p className="text-sm text-muted-foreground">There currently are no downloads</p>
            </div>
          )}
        </div>
      </div>
    </PopoverContent>
  );
};

export default SideNavigationDownloadsPopoverContent;
