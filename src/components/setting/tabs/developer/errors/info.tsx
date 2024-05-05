import BaseConsoleErrorContainer from '@/components/setting/tabs/developer/errors/baseContainer';
import { Info } from 'lucide-react';
import { FC } from 'react';

interface ConsoleInfoDisplayProps {
  customIcon?: JSX.Element;
  // title: string;
  description: string;
}

const ConsoleInfoDisplay: FC<ConsoleInfoDisplayProps> = ({ description, customIcon }) => {
  return (
    <BaseConsoleErrorContainer>
      <div className="text-orange-400">{customIcon ? customIcon : <Info />}</div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </BaseConsoleErrorContainer>
  );
};

export default ConsoleInfoDisplay;
