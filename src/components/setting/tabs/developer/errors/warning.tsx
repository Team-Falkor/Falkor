import { FC } from 'react';

import BaseConsoleErrorContainer from '@/components/setting/tabs/developer/errors/baseContainer';
import { CircleAlert } from 'lucide-react';

interface ConsoleWarningDisplayProps {
  customIcon?: JSX.Element;
  // title: string;
  description: string;
}

const ConsoleWarningDisplay: FC<ConsoleWarningDisplayProps> = ({ description, customIcon }) => {
  return (
    <BaseConsoleErrorContainer>
      <div className="text-yellow-400">{customIcon ? customIcon : <CircleAlert />}</div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </BaseConsoleErrorContainer>
  );
};

export default ConsoleWarningDisplay;
