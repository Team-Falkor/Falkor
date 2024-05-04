import { RqbitDesktopConfig } from '@/@types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTorrentConfig } from '@/stores';
import { saveConfig } from '@/utils/torrent/config';
import { open } from '@tauri-apps/api/dialog';
import { FolderOpen } from 'lucide-react';
import { useState } from 'react';

const TorrentDownloadPath = () => {
  const { config, setConfig } = useTorrentConfig();
  const [downloadPath, setDownloadPath] = useState<string>(config?.default_download_location ?? '');

  if (!config) return <div>Loading...</div>;

  const selectDownloadPath = async () => {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
        title: 'Select Download Folder',
      });

      if (!selected) return;
      if (selected && typeof selected !== 'string') return;

      const updatedConfig: RqbitDesktopConfig = {
        ...config,
        default_download_location: selected,
      };

      await saveConfig(updatedConfig);
      setDownloadPath(selected);
      setConfig(updatedConfig);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        value={downloadPath}
        onChange={(e) => setDownloadPath(e.target.value)}
      />
      <Button
        variant={'ghost'}
        size={'icon'}
        onClick={selectDownloadPath}
      >
        <FolderOpen />
      </Button>
    </div>
  );
};

export default TorrentDownloadPath;
