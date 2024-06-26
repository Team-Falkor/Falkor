import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useTorrent } from '@/contexts/torrent';
import { useShouldCheckForTorrents } from '@/stores';
import { FC, useRef } from 'react';
import { toast } from 'sonner';

interface DownloadDialogMagnetProps {
  setOpen: (open: boolean) => void;
}

const DownloadDialogMagnetContent: FC<DownloadDialogMagnetProps> = ({ setOpen }) => {
  const { setShouldCheckForTorrents } = useShouldCheckForTorrents();
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadTorrent } = useTorrent();

  const addTorrent = async () => {
    const link = inputRef.current?.value;
    if (!link || link.length <= 1)
      return toast.error('Invalid magnet link', {
        description: 'Please enter a valid magnet link',
      });

    await uploadTorrent(link);
    setShouldCheckForTorrents(true);
    setOpen(false);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add a magnet link</DialogTitle>
        <DialogDescription>Add a magnet link to the queue</DialogDescription>
      </DialogHeader>

      <div className="grid gap-6 py-2">
        <Input
          type="text"
          placeholder="magnet link"
          ref={inputRef}
        />
      </div>

      <DialogFooter>
        <Button
          variant="destructive"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          onClick={addTorrent}
        >
          Add
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DownloadDialogMagnetContent;
