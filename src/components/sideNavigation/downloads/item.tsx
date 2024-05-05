import { TorrentDetails } from '@/@types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useTorrent } from '@/contexts/torrent';
import useTorrentStats from '@/hooks/useTorrentStats';
import { cn } from '@/lib/utils';
import { bytesToHumanReadable } from '@/utils';
import { PauseIcon, PlayIcon, Trash } from 'lucide-react';
import { FunctionComponent, useEffect, useState } from 'react';

interface SideNavigationDownloadItemProps {
  id: number;
}

const SideNavigationDownloadItem: FunctionComponent<SideNavigationDownloadItemProps> = ({ id }) => {
  const { getTorrentDetails, pause, start, delete: deleteTorrent } = useTorrent();
  const [torrent, setTorrent] = useState<TorrentDetails>();
  const { stats, intervalId } = useTorrentStats({
    id: id,
    interval: 1000,
  });

  useEffect(() => {
    getTorrentDetails(id).then((data) => {
      setTorrent(data);
    });
  }, [id]);

  const progress = stats ? (stats.progress_bytes * 100) / stats.total_bytes : 0;

  return (
    <div
      className="relative flex flex-col w-full gap-2 p-2 rounded-lg cursor-pointer hover:bg-muted/50 focus-within:bg-muted group"
      // onClick={onClick}
    >
      <div className="flex items-center w-full gap-4">
        <h1 className="text-sm font-bold truncate">{torrent?.name}</h1>
      </div>

      <div className="flex flex-col w-full gap-2">
        <Progress
          value={progress}
          max={100}
          className={cn([
            'w-full h-3',
            {
              '[&>div]:bg-red-500': stats?.error,
              '[&>div]:bg-yellow-500': stats?.state === 'paused',
              '[&>div]:bg-green-500': stats?.finished,
            },
          ])}
        />
        <div className="flex justify-between gap-2">
          <p className="text-xs text-muted-foreground">{bytesToHumanReadable(stats?.progress_bytes ?? 0)}</p>
          {/* <p className="text-sm text-muted-foreground">{progress ? `${progress}%` : '0%'}</p> */}
          <p className="text-xs text-muted-foreground">{bytesToHumanReadable(stats?.total_bytes ?? 0)}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="absolute top-0 right-0 flex gap-2 p-2">
        <Button
          variant={'ghost'}
          size="icon"
          className="size-4"
          onClick={() => {
            deleteTorrent(id);
            if (intervalId) clearInterval(intervalId);
          }}
        >
          <Trash className="size-3" />
        </Button>

        <Button
          variant={'ghost'}
          size="icon"
          className="size-4"
        >
          {stats?.state === 'paused' ? (
            <PlayIcon
              className="size-3"
              onClick={() => start(id)}
            />
          ) : (
            <PauseIcon
              className="size-3"
              onClick={() => pause(id)}
            />
          )}
        </Button>
      </div>
    </div>
  );
};

export default SideNavigationDownloadItem;
