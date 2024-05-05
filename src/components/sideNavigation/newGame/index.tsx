import NewGameModalContent from '@/components/sideNavigation/newGame/modal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

const NewGame = () => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip delayDuration={500}>
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <TooltipTrigger asChild>
          <DialogTrigger>
            <Button
              variant={'ghost'}
              size={'icon'}
              className="relative group"
            >
              <div className="w-full h-full bg-blue-400 rounded-md" />
              <div className="absolute inset-0 z-20 flex items-center justify-center transition-all opacity-100 bg-gradient-to-tr from-background to-transparent hover:opacity-85">
                <PlusIcon fill="white" />
              </div>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={8}
        >
          New Game
        </TooltipContent>
        <NewGameModalContent setOpen={setOpen} />
      </Dialog>
    </Tooltip>
  );
};

export default NewGame;
