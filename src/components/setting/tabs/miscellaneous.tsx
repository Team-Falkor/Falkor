import SettingTitle from "@/components/setting/title";
import { useLanguageContext } from "@/contexts/languageContext";
import { FC } from "react";

interface TorrentSettingProps {
  index: number;
  currentIndex: number;
}

const MiscellaneousSettings: FC<TorrentSettingProps> = ({
  index,
  currentIndex,
}) => {
  const { t } = useLanguageContext();
  if (index !== currentIndex) return null;

  return (
    <div>
      <SettingTitle>{t("Settings.titles.miscellaneous")}</SettingTitle>
    </div>
  );
};

export default MiscellaneousSettings;
