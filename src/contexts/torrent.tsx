import { CurrentDesktopState, RqbitAPI, RqbitDesktopConfig } from '@/@types';
import MiddleLoading from '@/components/loading/middle';
import { useTorrentConfig } from '@/stores';
import { makeAPI } from '@/utils/torrent/api';
import { invoke } from '@tauri-apps/api';
import { FC, PropsWithChildren, createContext, useContext, useEffect } from 'react';
import { toast } from 'sonner';

async function get_default_config(): Promise<RqbitDesktopConfig> {
  return invoke<RqbitDesktopConfig>('config_default');
}

async function get_current_config(): Promise<CurrentDesktopState> {
  return invoke<CurrentDesktopState>('config_current');
}

type TorrentContextProps = RqbitAPI;

const TorrentContext = createContext<TorrentContextProps | null>(null);

export function useTorrent() {
  const context = useContext(TorrentContext);

  if (context === null) throw new Error('useTorrent must be used within a TorrentProvider');
  return context;
}

const getConfig = async () => {
  try {
    const [currentConfig, defaultConfig] = await Promise.all([get_current_config(), get_default_config()]);

    // if (currentConfig.configured && currentConfig.config) {
    //   console.log(`Loading current torrent config`);

    //   await invoke('config_change', { config: currentConfig.config });
    //   return currentConfig.config;
    // }

    console.log(`Loading default torrent config`);

    await invoke('config_change', { config: defaultConfig });
    return defaultConfig;
  } catch (error) {
    console.error(error);
    toast.error('Failed to load torrent config');
    throw new Error('Failed to load torrent config');
  }
};

export const TorrentProvider: FC<PropsWithChildren> = ({ children }) => {
  const { config, setConfig } = useTorrentConfig();

  useEffect(() => {
    if (config) return;
    getConfig().then((config) => {
      setConfig(config);
    });
  }, []);

  if (!config) return <MiddleLoading title="Loading Torrent Config" />;

  return <TorrentContext.Provider value={makeAPI(config)}>{children}</TorrentContext.Provider>;
};
