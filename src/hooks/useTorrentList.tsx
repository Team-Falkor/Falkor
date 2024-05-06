import { TorrentId } from '@/@types';
import { useTorrent } from '@/contexts/torrent';
import { useShouldCheckForTorrents } from '@/stores';
import { useEffect, useRef, useState } from 'react';

const useTorrentList = () => {
  const firstRun = useRef(true);
  const { shouldCheckForTorrents, setShouldCheckForTorrents } = useShouldCheckForTorrents();
  const { listTorrents } = useTorrent();
  const [list, setList] = useState<Array<TorrentId>>([]);

  useEffect(() => {
    if (!shouldCheckForTorrents && !firstRun.current) return;

    console.log('Checking for torrents...');
    listTorrents().then((data) => {
      if (firstRun.current) firstRun.current = false;
      setList(data.torrents);
      setShouldCheckForTorrents(false);
    });

    return () => {
      setShouldCheckForTorrents(false);
    };
  }, [shouldCheckForTorrents]);

  return { list };
};

export default useTorrentList;
