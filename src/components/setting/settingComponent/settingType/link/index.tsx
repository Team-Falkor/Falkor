import SettingItemTitle from '@/components/setting/settingComponent/settingType/title';
import { SettingPropsLink } from '@/components/setting/settingComponent/types';
import { FC } from 'react';

const SettingLink: FC<SettingPropsLink> = ({ settingTitle, settingDescription }) => {
  return (
    <div className="flex flex-col">
      <SettingItemTitle
        settingTitle={settingTitle}
        settingDescription={settingDescription}
      />
      <div className="p-3 px-4"></div>
    </div>
  );
};

export { SettingLink };
