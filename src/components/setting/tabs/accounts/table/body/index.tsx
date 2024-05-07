import AccountsTableItem from '@/components/setting/tabs/accounts/table/body/item';
import { TableBody } from '@/components/ui/table';
import { checkForRealDebrid, checkforRealDebridUser } from '@/hooks/useRealDebridLogin/utils';
import { useRealDebridStore } from '@/stores/settings';
import RealDebridClient from '@/utils/realdebrid';
import { setRealDebridUserInfo, settingsStore } from '@/utils/stores';
import dayjs from 'dayjs';
import { useEffect } from 'react';

const AccountsTableBody = () => {
  const { setRealDebridSettings, realDebridSettings, userInfo, setUserInfo } = useRealDebridStore();

  useEffect(() => {
    if (realDebridSettings) return;

    checkForRealDebrid().then((settings) => {
      console.log(settings);
      if (!settings) return;
      setRealDebridSettings(settings);
    });
  }, [realDebridSettings]);

  const getInfo = async () => {
    console.log({ realDebridSettings: realDebridSettings });
    if (!realDebridSettings) return;
    const rd = new RealDebridClient(realDebridSettings.accessToken);
    const userInfo = await rd.user.getUserInfo();

    console.log({
      userInfo,
    });

    if (!userInfo) return;
    setUserInfo(userInfo);
    await setRealDebridUserInfo(userInfo);

    await settingsStore.save();
  };

  useEffect(() => {
    if (!realDebridSettings) return;
    if (userInfo) return;

    checkforRealDebridUser().then((userInfoo) => {
      if (!userInfoo) getInfo();
      else setUserInfo(userInfoo);
    });
  }, [userInfo, realDebridSettings]);

  return (
    <TableBody>
      {!!userInfo && (
        <AccountsTableItem
          avatar={userInfo?.avatar}
          email={userInfo?.email}
          name={userInfo?.username ?? '??'}
          date={dayjs(userInfo?.expiration).format('DD MMM YYYY, hh:mm A')}
          type={userInfo?.type ?? '??'}
          service={'Real Debrid'}
        />
      )}
    </TableBody>
  );
};

export default AccountsTableBody;
