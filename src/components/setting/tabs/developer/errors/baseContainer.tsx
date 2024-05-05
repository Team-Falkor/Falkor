import { FC, PropsWithChildren } from 'react';

const BaseConsoleErrorContainer: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex items-center w-full gap-3 px-3 py-1">{children}</div>;
};

export default BaseConsoleErrorContainer;
