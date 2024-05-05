import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const DownloadDialogMagnetContent = () => {
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
        />
      </div>

      <DialogFooter>
        <Button variant="destructive">Cancel</Button>
        <Button variant="secondary">Add</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DownloadDialogMagnetContent;
