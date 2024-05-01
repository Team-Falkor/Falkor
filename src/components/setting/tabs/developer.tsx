import SettingTitle from '@/components/setting/title';
import { FC } from 'react';

interface TorrentSettingProps {
  index: number;
  currentIndex: number;
}

const DeveloperSettings: FC<TorrentSettingProps> = ({ index, currentIndex }) => {
  if (index !== currentIndex) return null;

  return (
    <div>
      <SettingTitle>Developer Settings</SettingTitle>
    </div>
  );
};

export default DeveloperSettings;
