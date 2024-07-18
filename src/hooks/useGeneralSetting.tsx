import { SettingOption } from "@/@types";
import { settingsStore } from "@/utils/stores";
import { useEffect, useState } from "react";

interface GeneralSettingProps<T> {
  key: SettingOption;
  default?: T;
}

const useGeneralSetting = <T extends string | number | boolean>({
  key,
  default: defaultValue,
}: GeneralSettingProps<T>) => {
  const realKey = `setting-${key}`;
  const settings = settingsStore.get<T>(realKey);
  const [settingsState, setSettingsState] = useState<T | null>(null);

  useEffect(() => {
    settings.then((value) => {
      setSettingsState(value ?? defaultValue ?? null);
    });
  }, []);

  const setSetting = (value: T) => {
    settingsStore.set(realKey, value);
    setSettingsState(value);
  };

  return { settingsState, setSetting };
};

export default useGeneralSetting;
