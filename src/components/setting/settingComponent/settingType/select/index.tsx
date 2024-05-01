import SettingItemTitle from '@/components/setting/settingComponent/settingType/title';
import { SettingPropsSelect } from '@/components/setting/settingComponent/types';
import { FC } from 'react';

const SettingSelect: FC<SettingPropsSelect> = ({ settingTitle, settingDescription }) => {
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
export { SettingSelect };
