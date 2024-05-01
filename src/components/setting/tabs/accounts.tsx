import Setting from '@/components/setting/settingComponent';
import Container from '@/components/setting/tabs/container';
import SettingTitle from '@/components/setting/title';
import { DialogContent } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { FC } from 'react';

interface TorrentSettingProps {
  index: number;
  currentIndex: number;
}

const AccountsSettings: FC<TorrentSettingProps> = ({ index, currentIndex }) => {
  if (index !== currentIndex) return null;

  return (
    <div>
      <SettingTitle>Accounts Settings</SettingTitle>

      <Container>
        <div className="flex items-center space-x-2">
          <Switch id="use-downloads" />

          <Label htmlFor="use-downloads">Use Account(s) to download</Label>
        </div>

        <div>
          <Setting
            settingType="dialog"
            DialogContent={<DialogContent></DialogContent>}
            buttonLabel="Add Account"
            title="Add Account"
            description="Add an account to use for downloading torrents"
            onClick={() => {}}
          />
        </div>
      </Container>
    </div>
  );
};

export default AccountsSettings;
