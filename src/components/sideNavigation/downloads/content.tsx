import SideNavigationDownloadItem from '@/components/sideNavigation/downloads/item';
import { Button } from '@/components/ui/button';
import { PopoverContent } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent } from '@/components/ui/tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { MagnetIcon, PlusIcon } from 'lucide-react';

const SideNavigationDownloadsPopoverContent = () => {
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
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <PlusIcon className="size-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add from .torrent</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <MagnetIcon className="size-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add from magnet link</TooltipContent>
            </Tooltip>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          <SideNavigationDownloadItem
            id="god-of-war"
            title="God of war"
            onClick={() => {}}
            progress={20}
            downloadedAmount={2500000000}
            totalAmount={5000000000}
          />

          <SideNavigationDownloadItem
            id="horizon-forbidden"
            title="Horizon Forbidden West"
            onClick={() => {}}
            progress={0}
          />
        </div>
      </div>
    </PopoverContent>
  );
};

export default SideNavigationDownloadsPopoverContent;
