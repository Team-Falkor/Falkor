import { SettingOption } from "@/@types";
import Setting from "@/components/setting/settingComponent";
import Container from "@/components/setting/tabs/container";
import SettingTitle from "@/components/setting/title";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useGeneralSetting from "@/hooks/useGeneralSetting";
import { FC } from "react";

interface GeneralSettingProps {
  index: number;
  currentIndex: number;
}

const GeneralSetting: FC<GeneralSettingProps> = ({ index, currentIndex }) => {
  const { settingsState, setSetting } = useGeneralSetting<boolean>({
    key: SettingOption["use-bg-on-sidebar"],
    default: true,
  });

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

        {/* SHOW BG ON SIDEBAR */}
        <div className="flex items-center space-x-2 mt-4">
          <Switch
            id="use-bg-on-sidebar"
            checked={settingsState ?? false}
            onCheckedChange={setSetting}
          />

          <Label htmlFor="use-bg-on-sidebar">Use background on sidebar</Label>
        </div>
      </Container>
    </div>
  );
};

export default GeneralSetting;
