import Setting from '@/components/setting/settingComponent';
import Container from '@/components/setting/tabs/container';
import SettingTitle from '@/components/setting/title';
import { FC } from 'react';

interface GeneralSettingProps {
  index: number;
  currentIndex: number;
}

const GeneralSetting: FC<GeneralSettingProps> = ({ index, currentIndex }) => {
  if (index !== currentIndex) return null;

  return (
    <div>
      <SettingTitle>General Settings</SettingTitle>

      <Container>
        <Setting
          settingType="button"
          settingDescription="Change the local used for ITAD prices"
          settingTitle="Change Local"
          buttonLabel="Change Local"
          onClick={() => {}}
          buttonType="secondary"
        />
      </Container>
    </div>
  );
};

export default GeneralSetting;
