import RealDebridDialog from "@/components/modals/realdebrid";
import AccountsTable from "@/components/setting/tabs/accounts/table";
import Container from "@/components/setting/tabs/container";
import SettingTitle from "@/components/setting/title";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLanguageContext } from "@/contexts/languageContext";
import { useRealDebridStore } from "@/stores/settings";
import { FC } from "react";

interface TorrentSettingProps {
  index: number;
  currentIndex: number;
}

const AccountsSettings: FC<TorrentSettingProps> = ({ index, currentIndex }) => {
  const { userInfo } = useRealDebridStore();
  const { t } = useLanguageContext();

  if (index !== currentIndex) return null;

  return (
    <div>
      <SettingTitle>{t("Settings.titles.accounts")}</SettingTitle>

      <Container>
        <div className="flex items-center space-x-2">
          <Switch id="use-downloads" />

          <Label htmlFor="use-downloads">
            {t("Settings.accounts_use_to_download.title")}
          </Label>
        </div>

        <div className="mt-2 mb-4">
          <RealDebridDialog disabled={!!userInfo}>
            <Button variant="secondary" disabled={!!userInfo}>
              {t("add_account")}
            </Button>
          </RealDebridDialog>
        </div>

        <AccountsTable />
      </Container>
    </div>
  );
};

export default AccountsSettings;
