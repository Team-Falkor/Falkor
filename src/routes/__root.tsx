import SideNavigation from '@/components/sideNavigation';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex flex-row w-full h-full">
        <SideNavigation />
        <div className="w-full h-full ml-[56px]">
          <Outlet />
        </div>
      </div>
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
