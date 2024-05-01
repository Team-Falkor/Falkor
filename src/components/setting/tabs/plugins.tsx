import SettingTitle from '@/components/setting/title';
import { FC } from 'react';

interface GeneralSettingProps {
  index: number;
  currentIndex: number;
}

const Plugins: FC<GeneralSettingProps> = ({ index, currentIndex }) => {
  if (index !== currentIndex) return null;

  return (
    <div>
      <SettingTitle>Plugins</SettingTitle>
    </div>
  );
};

export default Plugins;
