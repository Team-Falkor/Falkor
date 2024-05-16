import { FC } from 'react';

interface CountdownItemProps {
  title: 'Years' | 'Months' | 'Weeks' | 'Days' | 'Hours' | 'Minutes' | 'Seconds';
  data: number;
}

const CountdownItem: FC<CountdownItemProps> = ({ data, title }) => {
  return (
    <div className="flex flex-col items-center border rounded-lg border-slate-300 bg-slate-800 bg-opacity-60 min-w-12">
      <span className="w-full p-1 text-sm font-medium text-center border-b border-slate-300">{title}</span>
      <span className="p-1 pt-0 text-2xl font-bold">{data}</span>
    </div>
  );
};

export default CountdownItem;
