import { useRealDebridStore } from '@/stores/settings';
import { writeText } from '@tauri-apps/api/clipboard';
import { open } from '@tauri-apps/api/shell';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import * as rd from './utils';

const useRealDebridLogin = (shouldStart: boolean) => {
  const [deviceCodeInfo, setDeviceCodeInfo] = useState<{
    device_code: string;
    user_code: string;
    interval: string;
    expires_in: string;
    verification_url: string;
  } | null>();
  const { setRealDebridSettings, realDebridSettings } = useRealDebridStore();

  const openRealDebrid = async () => {
    if (!deviceCodeInfo?.user_code) return;

    await writeText(deviceCodeInfo.user_code);
    toast.success(`Copied ${deviceCodeInfo.user_code} to clipboard`, {
      position: 'bottom-center',
    });

    await open('https://real-debrid.com/device');
  };

  const obtainCode = async () => {
    if (realDebridSettings) return;
    if (!shouldStart) return;

    const data = await rd.obtainDeviceCode();
    if (!data) return;

    setDeviceCodeInfo(data);
  };

  const poll = async () => {
    if (realDebridSettings) return;
    if (!deviceCodeInfo) return;
    if (!shouldStart) return;

    try {
      const credentials = await rd.pollForCredentials(
        deviceCodeInfo.device_code,
        parseInt(deviceCodeInfo.interval),
        parseInt(deviceCodeInfo.expires_in),
      );

      if (!credentials) return;

      const data = await rd.obtainAccessToken(deviceCodeInfo.device_code);

      await rd.setStore(
        {
          accessToken: data.access_token,
          expires: data.expires_in,
          refreshToken: data.refresh_token,
        },
        setRealDebridSettings,
      );
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const cancel = async () => {
    if (!deviceCodeInfo) return;
    if (!shouldStart) return;

    setDeviceCodeInfo(null);
    return true;
  };

  useEffect(() => {
    obtainCode();
  }, [shouldStart]);

  useEffect(() => {
    poll();
  }, [deviceCodeInfo]);

  return {
    deviceCodeInfo,
    openRealDebrid,
    realDebridSettings,
    cancel,
  };
};

export default useRealDebridLogin;
