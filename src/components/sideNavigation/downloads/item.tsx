import { Progress } from '@/components/ui/progress';
import { bytesToHumanReadable } from '@/utils';
import { FunctionComponent } from 'react';

interface SideNavigationDownloadItemProps {
  id: string;
  title: string;
  progress?: number;
  downloadedAmount?: number;
  totalAmount?: number;
  onClick?: () => void;
  onRemove?: () => void;
  onEdit?: () => void;
  onDownload?: () => void;
}

const SideNavigationDownloadItem: FunctionComponent<SideNavigationDownloadItemProps> = ({
  title,
  onClick,
  progress,
  downloadedAmount,
  totalAmount,
}) => {
  return (
    <div
      className="flex flex-col w-full gap-2 p-2 rounded-lg cursor-pointer hover:bg-muted/50 focus-within:bg-muted"
      onClick={onClick}
    >
      <div className="flex items-center w-full gap-4">
        <h1 className="text-sm font-bold truncate">{title}</h1>
      </div>

      <div className="flex flex-col w-full gap-2">
        <Progress value={progress} />
        <div className="flex justify-between gap-2">
          <p className="text-xs text-muted-foreground">{bytesToHumanReadable(downloadedAmount ?? 0)}</p>
          {/* <p className="text-sm text-muted-foreground">{progress ? `${progress}%` : '0%'}</p> */}
          <p className="text-xs text-muted-foreground">{bytesToHumanReadable(totalAmount ?? 0)}</p>
        </div>
      </div>
    </div>
  );
};

export default SideNavigationDownloadItem;
