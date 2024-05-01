import SideNavigation from '@/components/sideNavigation';
import { Toaster } from '@/components/ui/sonner';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="grid h-screen w-full pl-[56px]">
        <SideNavigation />
        <Outlet />
      </div>
      <Toaster />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
