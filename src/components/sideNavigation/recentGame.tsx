import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PlayIcon } from 'lucide-react';
import { FC } from 'react';

interface RecentGameProps {
  title: string;
  thumbnail: string;
}

const RecentGame: FC<RecentGameProps> = ({ thumbnail, title }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          aria-label={title}
          variant={'ghost'}
          size={'icon'}
          className="relative group"
        >
          <img
            src={thumbnail}
            className="relative z-10 object-cover object-top rounded-md size-9"
            alt={title}
          />

          <div className="absolute inset-0 z-20 flex items-center justify-center transition-all opacity-0 bg-gradient-to-tr from-background to-transparent group-hover:opacity-100">
            <PlayIcon fill="white" />
          </div>
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="right"
        sideOffset={8}
      >
        {title}
      </TooltipContent>
    </Tooltip>
  );
};

export default RecentGame;
