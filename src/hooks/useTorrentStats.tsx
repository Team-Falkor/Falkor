import { TorrentStats } from '@/@types';
import { useTorrent } from '@/contexts/torrent';
import { useEffect, useRef, useState } from 'react';

interface TorrentStatsProps {
  id: number;
  interval?: number;
}

const useTorrentStats = ({ id, interval }: TorrentStatsProps) => {
  const { getTorrentStats } = useTorrent();
  const [stats, setStats] = useState<TorrentStats>();
  const [finshed, setFinished] = useState<boolean>(false);
  const intervalId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    intervalId.current = setInterval(() => {
      getTorrentStats(id).then((data) => {
        setStats(data);
        setFinished(data?.finished ?? false);
      });
    }, interval ?? 1500);
  }, [id]);

  useEffect(() => {
    if (finshed) clearInterval(intervalId.current);
  }, [stats, finshed]);

  return {
    stats,
    finished: finshed,
    intervalId: intervalId.current,
  };
};

export default useTorrentStats;
