import SettingTitle from '@/components/setting/title';
import { FC } from 'react';

interface TorrentSettingProps {
  index: number;
  currentIndex: number;
}

const MiscellaneousSettings: FC<TorrentSettingProps> = ({ index, currentIndex }) => {
  if (index !== currentIndex) return null;

  return (
    <div>
      <SettingTitle>Miscellaneous Settings</SettingTitle>
    </div>
  );
};

export default MiscellaneousSettings;
