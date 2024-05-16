import { FC, PropsWithChildren } from 'react';

interface MainContainerProps extends PropsWithChildren {}

const MainContainer: FC<MainContainerProps> = ({ children }) => {
  return (
    <div className="relative w-full h-full p-6 max-w-[1350px] lg:max-w-[1700px] m-auto lg:overflow-visible overflow-x-hidden">
      {children}
    </div>
  );
};

export default MainContainer;
