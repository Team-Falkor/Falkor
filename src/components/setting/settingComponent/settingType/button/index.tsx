import SettingItemTitle from '@/components/setting/settingComponent/settingType/title';
import { SettingPropsButton } from '@/components/setting/settingComponent/types';
import { Button } from '@/components/ui/button';
import { FC } from 'react';

const SettingButton: FC<SettingPropsButton> = ({
  settingTitle,
  settingDescription,
  buttonLabel,
  buttonType = 'secondary',
  ...props
}) => {
  return (
    <div className="flex flex-col p-0">
      <SettingItemTitle
        settingTitle={settingTitle}
        settingDescription={settingDescription}
      />
      <div className="">
        <Button
          {...props}
          variant={buttonType}
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};

export { SettingButton };
