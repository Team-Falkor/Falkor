import SettingItemTitle from "@/components/setting/settingComponent/settingType/title";
import Container from "@/components/setting/tabs/container";
import TorrentDownloadPath from "@/components/setting/tabs/torrent/downloadPath";
import SettingTitle from "@/components/setting/title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguageContext } from "@/contexts/languageContext";
import { FC } from "react";

interface TorrentSettingProps {
  index: number;
  currentIndex: number;
}

const TorrentSettings: FC<TorrentSettingProps> = ({ index, currentIndex }) => {
  const { t } = useLanguageContext();

  if (index !== currentIndex) return null;

  return (
    <div>
      <SettingTitle>{t("Settings.titles.torrent")}</SettingTitle>

      <Container>
        <div>
          <div className="flex flex-col gap-2">
            <SettingItemTitle
              settingTitle={t("Settings.torrent_download_path.title")}
              settingDescription={t(
                "Settings.torrent_download_path.description"
              )}
            />
            <TorrentDownloadPath />
          </div>
        </div>

        <Accordion type="multiple">
          <AccordionItem value="dht">
            <AccordionTrigger className="hover:no-underline">
              <h1 className="text-xl font-bold">
                {t("Settings.torrent_dht_configuration.title")}
              </h1>
            </AccordionTrigger>
            <AccordionContent>
              <div>T</div>
              <div>T</div>
              <div>T</div>
              <div>T</div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Container>
    </div>
  );
};

export default TorrentSettings;
