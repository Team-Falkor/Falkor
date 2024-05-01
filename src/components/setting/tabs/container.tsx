import { FC, PropsWithChildren } from 'react';

const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-3 p-4">{children}</div>;
};

export default Container;
