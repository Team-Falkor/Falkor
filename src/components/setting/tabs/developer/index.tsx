import Container from '@/components/setting/tabs/container';
import ConsoleErrorDisplay from '@/components/setting/tabs/developer/errors/error';
import ConsoleInfoDisplay from '@/components/setting/tabs/developer/errors/info';
import ConsoleWarningDisplay from '@/components/setting/tabs/developer/errors/warning';
import SettingTitle from '@/components/setting/title';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
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

      <Container>
        <div className="grid gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="enable-dev-console" />

            <Label htmlFor="enable-dev-console">Enable Developer Console</Label>
          </div>

          <div>
            {/* Console Output */}
            <ScrollArea className="w-full rounded-lg h-96 ring-1 ring-muted">
              {/* Test item */}
              <div className="grid gap-2 py-2">
                <ConsoleWarningDisplay description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit similique quas et obcaecati, quasi quae corporis distinctio, repellendus excepturi nostrum consequatur sequi earum culpa ratione ea est praesentium mollitia ipsam!" />

                <ConsoleErrorDisplay description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit similique quas et obcaecati, quasi quae corporis distinctio, repellendus excepturi nostrum consequatur sequi earum culpa ratione ea est praesentium mollitia ipsam!" />

                <ConsoleInfoDisplay description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit similique quas et obcaecati, quasi quae corporis distinctio, repellendus excepturi nostrum consequatur sequi earum culpa ratione ea est praesentium mollitia ipsam!" />
                <ConsoleInfoDisplay description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit similique quas et obcaecati, quasi quae corporis distinctio, repellendus excepturi nostrum consequatur sequi earum culpa ratione ea est praesentium mollitia ipsam!" />
                <ConsoleInfoDisplay description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit similique quas et obcaecati, quasi quae corporis distinctio, repellendus excepturi nostrum consequatur sequi earum culpa ratione ea est praesentium mollitia ipsam!" />

                <ConsoleErrorDisplay description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit similique quas et obcaecati, quasi quae corporis distinctio, repellendus excepturi nostrum consequatur sequi earum culpa ratione ea est praesentium mollitia ipsam!" />
                <ConsoleInfoDisplay description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit similique quas et obcaecati, quasi quae corporis distinctio, repellendus excepturi nostrum consequatur sequi earum culpa ratione ea est praesentium mollitia ipsam!" />
                <ConsoleInfoDisplay description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit similique quas et obcaecati, quasi quae corporis distinctio, repellendus excepturi nostrum consequatur sequi earum culpa ratione ea est praesentium mollitia ipsam!" />
                <ConsoleInfoDisplay description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit similique quas et obcaecati, quasi quae corporis distinctio, repellendus excepturi nostrum consequatur sequi earum culpa ratione ea est praesentium mollitia ipsam!" />
                <ConsoleInfoDisplay description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit similique quas et obcaecati, quasi quae corporis distinctio, repellendus excepturi nostrum consequatur sequi earum culpa ratione ea est praesentium mollitia ipsam!" />
              </div>
            </ScrollArea>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DeveloperSettings;
