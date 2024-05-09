import { TorrentStats } from '@/@types';
import { useTorrent } from '@/contexts/torrent';
import { useEffect, useRef, useState } from 'react';

interface TorrentStatsProps {
  id: number;
  interval?: number;
}

const shouldClearInterval = (state: TorrentStats['state'] | undefined, intervalId: NodeJS.Timeout | undefined) => {
  switch (state) {
    case 'paused':
    case 'error':
      clearInterval(intervalId);
      return true;
    default:
      return false;
  }
};

const useTorrentStats = ({ id, interval }: TorrentStatsProps) => {
  const { getTorrentStats } = useTorrent();
  const [stats, setStats] = useState<TorrentStats>();
  const [finshed, setFinished] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const intervalId = useRef<NodeJS.Timeout>();

  const setStates = (data: TorrentStats) => {
    setStats(data);
    setPaused(data?.state === 'paused');
    setFinished(data?.finished ?? false);
  };

  useEffect(() => {
    if (paused) return;

    intervalId.current = setInterval(async () => {
      const data = await getTorrentStats(id);
      setStates(data);
    }, interval ?? 1500);
  }, [id, paused]);

  useEffect(() => {
    shouldClearInterval(stats?.state, intervalId.current);
    if (stats?.state == 'paused') setPaused(true);
    if (stats?.finished) setFinished(true);
  }, [stats, finshed, paused, id, intervalId.current]);

  return {
    stats,
    finished: finshed,
    intervalId: intervalId.current,
    paused: paused,
    setPaused: setPaused,
  };
};

export default useTorrentStats;
