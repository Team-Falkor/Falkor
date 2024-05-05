import { TorrentId } from '@/@types';
import { useTorrent } from '@/contexts/torrent';
import { useShouldCheckForTorrents } from '@/stores';
import { useEffect, useRef, useState } from 'react';

const useTorrentList = (interval?: number) => {
  const { shouldCheckForTorrents } = useShouldCheckForTorrents();
  const { listTorrents } = useTorrent();
  const [list, setList] = useState<Array<TorrentId>>([]);
  const intervalId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    console.log('Checking for torrents...');
    listTorrents().then((data) => {
      setList(data.torrents);
    });
  }, []);

  useEffect(() => {
    if (!shouldCheckForTorrents) return;

    intervalId.current = setInterval(() => {
      console.log('Checking for torrents...');
      listTorrents().then((data) => {
        setList(data.torrents);
      });
    }, interval ?? 1500);

    return () => clearInterval(intervalId.current);
  }, [shouldCheckForTorrents]);

  return { list, intervalId: intervalId.current };
};

export default useTorrentList;
