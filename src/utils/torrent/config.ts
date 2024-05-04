import { RqbitDesktopConfig } from '@/@types';
import { invoke } from '@tauri-apps/api';
import { toast } from 'sonner';

export const saveConfig = async (config: RqbitDesktopConfig) => {
  try {
    await invoke('config_change', { config });

    toast.success('Configuration saved successfully.');
  } catch (error) {
    console.error('Failed to save configuration:', error);
    toast.error('Failed to save configuration.');
  }
};
