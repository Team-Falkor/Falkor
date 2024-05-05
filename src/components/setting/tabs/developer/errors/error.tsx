import { FC } from 'react';

import BaseConsoleErrorContainer from '@/components/setting/tabs/developer/errors/baseContainer';
import { Ban } from 'lucide-react';

interface ConsoleErrorDisplayProps {
  customIcon?: JSX.Element;
  // title: string;
  description: string;
}

const ConsoleErrorDisplay: FC<ConsoleErrorDisplayProps> = ({ description, customIcon }) => {
  return (
    <BaseConsoleErrorContainer>
      <div className="text-red-400">{customIcon ? customIcon : <Ban />}</div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </BaseConsoleErrorContainer>
  );
};

export default ConsoleErrorDisplay;
