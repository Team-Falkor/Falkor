import SettingTitle from '@/components/setting/title';
import { FC } from 'react';

interface TorrentSettingProps {
  index: number;
  currentIndex: number;
}

const TorrentSettings: FC<TorrentSettingProps> = ({ index, currentIndex }) => {
  if (index !== currentIndex) return null;

  return (
    <div>
      <SettingTitle>Torrent Configuration Settings</SettingTitle>
    </div>
  );
};

export default TorrentSettings;
