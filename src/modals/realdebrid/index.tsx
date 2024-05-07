import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useRealDebridLogin from '@/hooks/useRealDebridLogin';
import { FC, PropsWithChildren, useEffect, useState } from 'react';

const RealDebridDialog: FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const { realDebridSettings, openRealDebrid, deviceCodeInfo, cancel } = useRealDebridLogin(open);

  useEffect(() => {
    if (!realDebridSettings) return;
    setOpen(false);
  }, [realDebridSettings]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log in to RealDebrid!</DialogTitle>
          <DialogDescription>
            {!deviceCodeInfo ? (
              <div>loading...</div>
            ) : (
              <ul>
                <li>
                  Goto: <strong>{deviceCodeInfo.verification_url}</strong>
                </li>
                <li>
                  Code: <strong>{deviceCodeInfo.user_code}</strong>
                </li>
                <li>
                  Expires: <strong>{deviceCodeInfo.expires_in}</strong>
                </li>
              </ul>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>
            <Button
              variant="destructive"
              onClick={cancel}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant={'secondary'}
            onClick={openRealDebrid}
          >
            Open Real Debrid
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RealDebridDialog;
