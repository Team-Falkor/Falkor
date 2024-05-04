import { Button } from '@/components/ui/button';
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
