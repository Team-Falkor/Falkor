import { Button } from '@/components/ui/button';
import { appWindow } from '@tauri-apps/api/window';
import { Minus } from 'lucide-react';

const Titlebar = () => {
  const action = (action: 'minimize' | 'maximize' | 'close') => {
    switch (action) {
      case 'minimize':
        appWindow.minimize();
        break;
      case 'maximize':
        appWindow.toggleMaximize();
        break;
      case 'close':
        appWindow.close();
        break;
      default:
        break;
    }
  };

  return (
    <div
      data-tauri-drag-region
      className="fixed top-0 left-0 right-0 flex items-center justify-between w-full h-8 px-2 bg-muted"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => action('minimize')}
        className="size-8"
      >
        <Minus className="size-full" />
      </Button>
    </div>
  );
};

export default Titlebar;
