import { CurrentDesktopState, RqbitDesktopConfig } from '@/@types';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { useTorrentConfig } from '@/stores';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { invoke } from '@tauri-apps/api';
import { useEffect } from 'react';
import { toast } from 'sonner';
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

async function get_default_config(): Promise<RqbitDesktopConfig> {
  return invoke<RqbitDesktopConfig>('config_default');
}

async function get_current_config(): Promise<CurrentDesktopState> {
  return invoke<CurrentDesktopState>('config_current');
}

const getConfig = async () => {
  try {
    const [currentConfig, defaultConfig] = await Promise.all([get_current_config(), get_default_config()]);

    if (currentConfig.configured && currentConfig.config) {
      console.log(`Loading current torrent config`);
      return currentConfig.config;
    }

    console.log(`Loading default torrent config`);

    return defaultConfig;
  } catch (error) {
    console.error(error);
    toast.error('Failed to load torrent config');
    throw new Error('Failed to load torrent config');
  }
};

function App() {
  const { setConfig, config } = useTorrentConfig();

  useEffect(() => {
    if (config) return;

    getConfig().then((config) => {
      setConfig(config);
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
          <RouterProvider router={router} />
        </QueryClientProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
