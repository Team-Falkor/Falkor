import { RealDebridAuth } from '@/utils/api/realdebrid/auth';
import { checkRealDebridData, checkRealDebridUserInfo, settingsStore } from '@/utils/stores';

export const realDebridAuth = new RealDebridAuth();

export interface RealDebridSettings {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  refreshToken: string;
  expires: string;
}

export const checkForRealDebrid = async () => {
  const settings = await checkRealDebridData();
  if (settings) return settings;
  return null;
};

export const checkforRealDebridUser = async () => {
  const user = await checkRealDebridUserInfo();
  console.log(user);
  if (user) return user;
  return null;
};

export const obtainDeviceCode = async () => {
  return await realDebridAuth.obtainDeviceCode();
};

export const pollForCredentials = async (deviceCode: string, interval: number, expiresIn: number) => {
  return await realDebridAuth.pollForCredentials(deviceCode, interval, expiresIn);
};

export const obtainAccessToken = async (deviceCode: string) => {
  return await realDebridAuth.obtainAccessToken(deviceCode);
};

export const setRealDebridData = async (credentials: RealDebridSettings) => {
  await settingsStore.set('real-debrid', credentials);
};

export const setStore = async (
  credentials: Pick<RealDebridSettings, 'accessToken' | 'expires' | 'refreshToken'>,
  setRdStore: (realDebridSettings: RealDebridSettings) => void,
) => {
  if (!realDebridAuth.clientId) throw new Error('No RealDebrid credentials found');
  if (!realDebridAuth.clientSecret) throw new Error('No RealDebrid credentials found');

  await setRealDebridData({
    ...credentials,
    clientId: realDebridAuth.clientId,
    clientSecret: realDebridAuth.clientSecret,
  });

  setRdStore({
    ...credentials,
    clientId: realDebridAuth.clientId,
    clientSecret: realDebridAuth.clientSecret,
  });
};
