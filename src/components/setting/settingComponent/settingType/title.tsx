import { DefaultSettingProps } from '@/components/setting/settingComponent/types';
import { FC } from 'react';

type SettingTitleProps = Pick<DefaultSettingProps, 'settingDescription' | 'settingTitle'>;

const SettingItemTitle: FC<SettingTitleProps> = ({ settingDescription, settingTitle }) => {
  if (!settingDescription && !settingTitle) return null;

  return (
    <div className="flex items-end justify-start gap-2 pb-3 ">
      {!!settingTitle && <h1 className="text-xl font-bold">{settingTitle}</h1>}
      {!!settingDescription && <p className="text-xs text-gray-400 mb-0.5">{settingDescription}</p>}
    </div>
  );
};

export default SettingItemTitle;
