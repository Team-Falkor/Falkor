import { SortBy } from '@/components/setting/tabs/plugins';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowDownAZ, ArrowDownNarrowWide, ArrowUpAZ, ArrowUpNarrowWide, Check, Columns2, Rows3 } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';

interface PluginsSortProps {
  showRows: boolean;
  setShowRows: (showRows: boolean) => void;
  sortBy: SortBy;
  setSortBy: Dispatch<SetStateAction<SortBy>>;
}

const PluginsSort: FC<PluginsSortProps> = ({ setShowRows, showRows, setSortBy, sortBy }) => {
  return (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant={'ghost'}
            size={'icon'}
          >
            <Check />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="capitalize">show installed only</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            variant={'ghost'}
            size={'icon'}
            onClick={() => setSortBy(sortBy === 'alphabetic-asc' ? 'alphabetic-desc' : 'alphabetic-asc')}
          >
            {sortBy === 'alphabetic-asc' ? <ArrowUpAZ /> : <ArrowDownAZ />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {sortBy === 'alphabetic-asc' ? 'Sort Alphabetically Ascending' : 'Sort Alphabetically Descending'}
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            variant={'ghost'}
            size={'icon'}
            onClick={() => setSortBy(sortBy === 'popularity-asc' ? 'popularity-desc' : 'popularity-asc')}
          >
            {sortBy === 'popularity-asc' ? <ArrowUpNarrowWide /> : <ArrowDownNarrowWide />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {sortBy === 'popularity-asc' ? 'Sort Popularity Ascending' : 'Sort Popularity Descending'}
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            variant={'ghost'}
            size={'icon'}
            onClick={() => setShowRows(!showRows)}
          >
            {showRows ? <Columns2 /> : <Rows3 />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{showRows ? 'Show List' : 'Show Grid'}</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default PluginsSort;
