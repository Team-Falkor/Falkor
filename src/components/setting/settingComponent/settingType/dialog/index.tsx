import SettingItemTitle from '@/components/setting/settingComponent/settingType/title';
import { SettingPropsDialog } from '@/components/setting/settingComponent/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { FC } from 'react';

const SettingDialog: FC<SettingPropsDialog> = ({ settingTitle, settingDescription, buttonLabel, DialogContent }) => {
  return (
    <div className="flex flex-col">
      <SettingItemTitle
        settingTitle={settingTitle}
        settingDescription={settingDescription}
      />

      <div className="py-3">
        <Dialog>
          <DialogTrigger>
            <Button variant="secondary">{buttonLabel}</Button>
          </DialogTrigger>

          {DialogContent}
        </Dialog>
      </div>
    </div>
  );
};

export { SettingDialog };
