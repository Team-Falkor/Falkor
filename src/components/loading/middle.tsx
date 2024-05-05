import { ShipWheel } from 'lucide-react';
import { FC } from 'react';

interface MiddleLoadingProps {
  title?: string;
  subtitle?: string;
}

const MiddleLoading: FC<MiddleLoadingProps> = ({ subtitle, title }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-2">
      <ShipWheel className="size-14 animate-bounce" />
      {title && <h1 className="text-2xl font-bold">{title}</h1>}
      {subtitle && <p className="text-sm">{subtitle}</p>}
    </div>
  );
};

export default MiddleLoading;
