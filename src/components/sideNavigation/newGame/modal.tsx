import NewGameForm from '@/components/sideNavigation/newGame/form';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FC } from 'react';

interface NewGameModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewGameModalContent: FC<NewGameModalProps> = ({ setOpen }) => {
  return (
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Add a New Game</DialogTitle>
        <DialogDescription>Add a new game, so you can easily launch it from the app</DialogDescription>
      </DialogHeader>
      <div className="grid gap-6 py-2">
        <NewGameForm setOpen={setOpen} />
      </div>
    </DialogContent>
  );
};

export default NewGameModalContent;
