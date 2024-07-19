import Setting from "@/components/setting/settingComponent";
import Container from "@/components/setting/tabs/container";
import SettingTitle from "@/components/setting/title";
import { useLanguageContext } from "@/contexts/languageContext";
import { FC } from "react";

interface GeneralSettingProps {
  index: number;
  currentIndex: number;
}

const GeneralSetting: FC<GeneralSettingProps> = ({ index, currentIndex }) => {
  const { t } = useLanguageContext();

  if (index !== currentIndex) return null;

  return (
    <div>
      <SettingTitle>{t("Settings.titles.general")}</SettingTitle>

      <Container>
        <Setting
          settingType="button"
          settingDescription={t("Settings.change_local.description")}
          settingTitle={t("Settings.change_local.title")}
          buttonLabel={t("Settings.change_local.title")}
          onClick={() => {}}
          buttonType="secondary"
        />

        {/* SHOW BG ON SIDEBAR */}
      </Container>
    </div>
  );
};

export default GeneralSetting;
