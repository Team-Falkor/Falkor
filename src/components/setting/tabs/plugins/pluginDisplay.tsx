import PluginCard from '@/components/cards/pluginCard';
import { SortBy } from '@/components/setting/tabs/plugins';
import { cn } from '@/lib/utils';
import { FC } from 'react';

interface PluginDisplayProps {
  showRows: boolean;
  setShowRows: (showRows: boolean) => void;

  sortBy: SortBy;
}

const PluginDisplay: FC<PluginDisplayProps> = ({ showRows }) => {
  return (
    <div
      className={cn([
        'py-5',
        {
          'grid grid-cols-2 gap-4': showRows,
          'grid grid-cols-1 gap-4': !showRows,
        },
      ])}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <PluginCard key={i} />
      ))}
    </div>
  );
};

export default PluginDisplay;
