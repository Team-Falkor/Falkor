import AccountsSettings from '@/components/setting/tabs/accounts';
import DeveloperSettings from '@/components/setting/tabs/developer';
import GeneralSetting from '@/components/setting/tabs/general';
import MiscellaneousSettings from '@/components/setting/tabs/miscellaneous';
import Plugins from '@/components/setting/tabs/plugins';
import TorrentSettings from '@/components/setting/tabs/torrent';
import SettingTab from '@/components/settings/settingTab';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Blocks, Code2, Cog, FileCog2, Settings2, UserCog } from 'lucide-react';
import { useState } from 'react';

export const Route = createLazyFileRoute('/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="w-full h-screen py-16 m-auto max-w-7xl">
      <div className="flex flex-row justify-between w-full h-full rounded-lg ring-1 ring-muted">
        <div className="flex flex-col h-full border-r w-80">
          <div className="p-3 px-4 border-b">
            <h1 className="text-xl font-bold">Settings</h1>
          </div>

          <nav className="mt-5 space-y-3">
            <SettingTab
              icon={<Cog />}
              title="General"
              isActive={currentTab === 0}
              onClick={() => setCurrentTab(0)}
            />

            <SettingTab
              icon={<FileCog2 />}
              title="Torrent Configuration"
              isActive={currentTab === 1}
              onClick={() => setCurrentTab(1)}
            />

            <SettingTab
              icon={<UserCog />}
              title="Accounts"
              isActive={currentTab === 2}
              onClick={() => setCurrentTab(2)}
            />

            <SettingTab
              icon={<Blocks />}
              title="Plugins"
              isActive={currentTab === 3}
              onClick={() => setCurrentTab(3)}
            />

            <SettingTab
              icon={<Code2 />}
              title="Developer"
              isActive={currentTab === 4}
              onClick={() => setCurrentTab(4)}
            />

            <SettingTab
              icon={<Settings2 />}
              title="Miscellaneous"
              isActive={currentTab === 5}
              onClick={() => setCurrentTab(5)}
            />
          </nav>
        </div>

        <div className="flex flex-col w-full h-full overflow-hidden">
          <GeneralSetting
            currentIndex={currentTab}
            index={0}
          />

          <TorrentSettings
            currentIndex={currentTab}
            index={1}
          />

          <AccountsSettings
            currentIndex={currentTab}
            index={2}
          />

          <Plugins
            currentIndex={currentTab}
            index={3}
          />

          <DeveloperSettings
            currentIndex={currentTab}
            index={4}
          />

          <MiscellaneousSettings
            currentIndex={currentTab}
            index={5}
          />
        </div>
      </div>
    </div>
  );
}
