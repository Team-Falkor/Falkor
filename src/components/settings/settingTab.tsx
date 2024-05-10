import { cn } from '@/lib/utils';
import { FC } from 'react';

interface SettingTabProps {
  title: string;
  icon: JSX.Element;
  isActive: boolean;
  onClick: () => void;
}

const SettingTab: FC<SettingTabProps> = ({ icon, title, isActive, onClick }) => {
  return (
    <button
      className={cn([
        'flex items-center w-full gap-3 px-3 py-2 text-sm font-medium transition-all group text-foreground hover:text-blue-400',
        {
          'border-l-4': isActive,
          'border-l-4 border-transparent': !isActive,
        },
      ])}
      aria-current="page"
      onClick={onClick}
    >
      {icon}
      <span className="truncate">{title}</span>
    </button>
  );
};

export default SettingTab;
