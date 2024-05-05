import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { open } from '@tauri-apps/api/dialog';
import { FolderOpen } from 'lucide-react';
import { useState } from 'react';

const DownloadDialogTorrentContent = () => {
  const [value, setValue] = useState<string>();

  const opemTorrentFile = async () => {
    const path = await open({
      multiple: false,
      filters: [{ name: 'Torrent', extensions: ['torrent'] }],
    });

    if (typeof path === 'string') {
      setValue(path);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add a .torrent file</DialogTitle>
        <DialogDescription>Add a .torrent file to the queue</DialogDescription>
      </DialogHeader>

      <div className="grid gap-6 py-2">
        <div className="flex w-full gap-2">
          <Input
            type="text"
            placeholder=".torrent file location"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <Button
            variant="ghost"
            size="icon"
            onClick={opemTorrentFile}
          >
            <FolderOpen />
          </Button>
        </div>
      </div>

      <DialogFooter>
        <Button variant="destructive">Cancel</Button>
        <Button variant="secondary">Add</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DownloadDialogTorrentContent;
