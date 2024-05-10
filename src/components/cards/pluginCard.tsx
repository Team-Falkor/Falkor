import { Button } from '@/components/ui/button';
import { FC } from 'react';

interface PluginCardProps {}

const PluginCard: FC<PluginCardProps> = ({}) => {
  return (
    <div className="grid items-center gap-4 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="flex self-start gap-3">
          <img
            src="https://images7.alphacoders.com/714/714040.jpg"
            alt="Plugin"
            className="rounded object-cover size-[40px]"
          />
          <div className="flex flex-col items-start justify-end">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Version 1.0.0</p>
            <h3 className="text-sm font-semibold truncate">Cracked Gamestatus</h3>
          </div>
        </div>
        <p className="text-xs font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus mollitia reiciendis odio laudantium veritatis,
          eaque eos qui voluptate corporis deleniti minima animi consequatur fugit suscipit libero sint nulla, maiores
          omnis. Veniam distinctio officia quis incidunt, in asperiores?
        </p>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button variant="destructive">Uninstall</Button>
        <Button variant="secondary">Update</Button>
      </div>
    </div>
  );
};

export default PluginCard;
