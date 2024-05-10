import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
<<<<<<< HEAD
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
=======
import { useTorrent } from '@/contexts/torrent';
import { useShouldCheckForTorrents } from '@/stores';
import { FileUp } from 'lucide-react';
import { FC, useRef, useState } from 'react';
import { toast } from 'sonner';

interface DownloadDialogTorrentProps {
  setOpen: (open: boolean) => void;
}

const DownloadDialogTorrentContent: FC<DownloadDialogTorrentProps> = ({ setOpen }) => {
  const { setShouldCheckForTorrents } = useShouldCheckForTorrents();
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadTorrent } = useTorrent();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const addTorrent = async () => {
    if (!selectedFile) {
      return toast.error('Invalid torrent link', {
        description: 'Please enter a valid torrent link',
      });
    }

    await uploadTorrent(selectedFile);
    setShouldCheckForTorrents(true);
    setOpen(false);
>>>>>>> main
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add a .torrent file</DialogTitle>
        <DialogDescription>Add a .torrent file to the queue</DialogDescription>
      </DialogHeader>

      <div className="grid gap-6 py-2">
        <div className="flex w-full gap-2">
<<<<<<< HEAD
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
=======
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FileUp />

                {!selectedFile ? (
                  <>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">.torrent</p>
                  </>
                ) : (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{selectedFile?.name}</p>
                )}
              </div>

              <input
                id="dropzone-file"
                type="file"
                accept=".torrent"
                multiple={false}
                onChange={(e) => {
                  if (e.target.files) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
                className="hidden"
                ref={inputRef}
              />
            </label>
          </div>
>>>>>>> main
        </div>
      </div>

      <DialogFooter>
<<<<<<< HEAD
        <Button variant="destructive">Cancel</Button>
        <Button variant="secondary">Add</Button>
=======
        <Button
          variant="destructive"
          onClick={() => {
            setShouldCheckForTorrents(false);
            setOpen(false);
            setSelectedFile(null);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          onClick={addTorrent}
        >
          Add
        </Button>
>>>>>>> main
      </DialogFooter>
    </DialogContent>
  );
};

export default DownloadDialogTorrentContent;
