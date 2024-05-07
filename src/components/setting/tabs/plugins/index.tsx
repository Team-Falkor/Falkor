import PluginDisplay from '@/components/setting/tabs/plugins/pluginDisplay';
import PluginsSort from '@/components/setting/tabs/plugins/sort';
import SettingTitle from '@/components/setting/title';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FC, useState } from 'react';

interface GeneralSettingProps {
  index: number;
  currentIndex: number;
}

export type SortBy = 'alphabetic-asc' | 'alphabetic-desc' | 'popularity-asc' | 'popularity-desc';

const Plugins: FC<GeneralSettingProps> = ({ index, currentIndex }) => {
  const [showRows, setShowRows] = useState(true);
  const [sortBy, setSortBy] = useState<SortBy>('alphabetic-asc');

  if (index !== currentIndex) return null;

  return (
    <div className="h-full overflow-hidden">
      <SettingTitle>Plugins</SettingTitle>

      <ScrollArea className="w-full h-full pt-2 pb-16">
        <div className="px-5 py-2 ">
          <div className="flex justify-between">
            <div className="w-1/2">
              <Input
                placeholder="What plugin are you looking for?"
                type="text"
              />
            </div>

            <PluginsSort
              showRows={showRows}
              setShowRows={setShowRows}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>

          <PluginDisplay
            showRows={showRows}
            setShowRows={setShowRows}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default Plugins;
