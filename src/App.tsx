import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { TorrentProvider } from '@/contexts/torrent';
import { useOS } from '@/stores/settings';
import { getRealOs } from '@/utils';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { useEffect } from 'react';
import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const { setPlatform, platform } = useOS();

  useEffect(() => {
    if (platform !== 'unknown') return;
    getRealOs().then((platform) => {
      setPlatform(platform);
    });
  }, []);

  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="ui-theme"
    >
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <TorrentProvider>
            <RouterProvider router={router} />
          </TorrentProvider>
        </QueryClientProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
