import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useCollection from '@/hooks/useCollection';
import { Dispatch, FC, SetStateAction, useRef } from 'react';
import { toast } from 'sonner';

interface NewCollectionDialogProps {
  games?: number[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewCollectionDialogContent: FC<NewCollectionDialogProps> = ({ games, open, setOpen }) => {
  const { collectionRef } = useCollection();
  const ref = useRef<HTMLInputElement>(null);

  const onSubmit = async () => {
    if (!collectionRef) return;
    if (!open) return;
    if (!ref?.current) {
      toast.error('There was an error creating the collection', {
        description: 'Please try again',
      });
      return;
    }
    const name = ref.current?.value;

    if (!name) {
      toast.error('Collection name is required');
      return;
    }

    if (name.length < 1 || name.length > 64) {
      toast.error('Collection name must be between 1 and 64 characters');
      return;
    }

    try {
      await collectionRef.createCollection(name, games);

      toast.success('Collection created successfully', {
        description: `Collection ${name} created successfully`,
      });
    } catch (error) {
      toast.error('Failed to create collection');
      console.error(error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <DialogContent className="max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create New Collection</DialogTitle>
        <DialogDescription>Fill in the information below to create a new collection.</DialogDescription>
      </DialogHeader>

      <div className="grid gap-3 py-2">
        <Label htmlFor="collectionName">Name</Label>
        <Input
          ref={ref}
          id="collectionName"
          placeholder="Enter collection name"
          type="text"
          className="w-full"
          minLength={1}
          maxLength={64}
        />
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant={'destructive'}>Cancel</Button>
        </DialogClose>
        <Button
          variant={'secondary'}
          onClick={onSubmit}
        >
          Create
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default NewCollectionDialogContent;
