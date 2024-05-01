import {
  SettingButton,
  SettingInput,
  SettingLink,
  SettingSelect,
} from '@/components/setting/settingComponent/settingType';
import { SettingDialog } from '@/components/setting/settingComponent/settingType/dialog';
import { FunctionComponent } from 'react';
import { SettingProps } from './types';

const Setting: FunctionComponent<SettingProps> = (props) => {
  switch (props.settingType) {
    case 'button':
      return <SettingButton {...props} />;
    case 'input':
      return <SettingInput {...props} />;
    case 'link':
      return <SettingLink {...props} />;
    case 'select':
      return <SettingSelect {...props} />;
    case 'dialog':
      return <SettingDialog {...props} />;
    default:
      return null;
  }
};

export default Setting;
