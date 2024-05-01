import { AnchorHTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes } from 'react';

export type SettingProps =
  | SettingPropsButton
  | SettingPropsLink
  | SettingPropsInput
  | SettingPropsSelect
  | SettingPropsDialog;

export type SettingPropsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  settingType: 'button';
  buttonType: 'secondary' | 'link' | 'default' | 'destructive' | 'outline' | 'ghost' | null | undefined;
  buttonLabel: string;
  onClick: () => void;
} & DefaultSettingProps;

export type SettingPropsLink = AnchorHTMLAttributes<HTMLAnchorElement> & {
  settingType: 'link';
  link: string;
  label: string;
  icon?: JSX.Element;
} & DefaultSettingProps;

export type SettingPropsInput = InputHTMLAttributes<HTMLInputElement> & {
  settingType: 'input';
  label: string;
  icon?: JSX.Element;
} & DefaultSettingProps;

export type SettingPropsSelect = SelectHTMLAttributes<HTMLSelectElement> & {
  settingType: 'select';
  choices: { name: string; value: string; icon?: JSX.Element; disabled?: boolean; onClick?: () => void }[];
  label: string;
} & DefaultSettingProps;

export type SettingPropsDialog = {
  settingType: 'dialog';
  title: string;
  description: string;
  buttonLabel: string;
  onClick: () => void;

  DialogContent: JSX.Element;
} & DefaultSettingProps;

export interface DefaultSettingProps {
  settingTitle?: string;
  settingDescription?: string;
}
