import SettingItemTitle from '@/components/setting/settingComponent/settingType/title';
import Container from '@/components/setting/tabs/container';
import TorrentDownloadPath from '@/components/setting/tabs/torrent/downloadPath';
import SettingTitle from '@/components/setting/title';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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

      <Container>
        <div>
          <div className="flex flex-col gap-2">
            <SettingItemTitle
              settingTitle="Download Path"
              settingDescription="Set the download path for torrents"
            />
            <TorrentDownloadPath />
          </div>
        </div>

        <Accordion type="multiple">
          <AccordionItem value="dht">
            <AccordionTrigger className="hover:no-underline">
              <h1 className="text-xl font-bold">DHT Configuration</h1>
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
