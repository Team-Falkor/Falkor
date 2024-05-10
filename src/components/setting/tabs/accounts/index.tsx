import AccountsTable from '@/components/setting/tabs/accounts/table';
import Container from '@/components/setting/tabs/container';
import SettingTitle from '@/components/setting/title';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import RealDebridDialog from '@/modals/realdebrid';
import { useRealDebridStore } from '@/stores/settings';
import { FC } from 'react';

interface TorrentSettingProps {
  index: number;
  currentIndex: number;
}

const AccountsSettings: FC<TorrentSettingProps> = ({ index, currentIndex }) => {
  const { userInfo } = useRealDebridStore();
  if (index !== currentIndex) return null;

  return (
    <div>
      <SettingTitle>Accounts Settings</SettingTitle>

      <Container>
        <div className="flex items-center space-x-2">
          <Switch id="use-downloads" />

          <Label htmlFor="use-downloads">Use Account(s) to download</Label>
        </div>

        <div className="mt-2 mb-4">
          <RealDebridDialog disabled={!!userInfo}>
            <Button
              variant="secondary"
              disabled={!!userInfo}
            >
              Add Account
            </Button>
          </RealDebridDialog>
        </div>

        <AccountsTable />
      </Container>
    </div>
  );
};

export default AccountsSettings;
