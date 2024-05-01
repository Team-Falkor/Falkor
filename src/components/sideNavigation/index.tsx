import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowDownToLine, BellIcon, HomeIcon, LibraryIcon, SearchIcon, Settings2 } from 'lucide-react';

import bg from '@/assets/bg.png';
import logo from '@/assets/icon.png';
import NavItem from '@/components/sideNavigation/item';
import NewGame from '@/components/sideNavigation/newGame';
import RecentGame from '@/components/sideNavigation/recentGame';
import Search from '@/components/sideNavigation/search';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';

const SideNavigation = () => {
  const [open, setOpen] = useState(false);
  return (
    <aside className="fixed left-0 z-20 flex flex-col h-full border-r inset-y">
      <div className="relative w-full h-full">
        <img
          src={bg}
          className="absolute inset-0 z-10 object-cover w-full h-full opacity-5"
        />

        <div className="relative z-20 flex flex-col h-screen overflow-hidden border-r bg-opacity-5">
          <div className="p-2 border-b">
            <Tooltip>
              <TooltipTrigger>
                <Link
                  aria-label="Home"
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'icon',
                  })}
                >
                  <img
                    src={logo}
                    className="size-8"
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Sail The Seas!</TooltipContent>
            </Tooltip>
          </div>
          <nav className="grid gap-2 p-2">
            <Popover
              open={open}
              onOpenChange={setOpen}
            >
              <PopoverTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn({
                    'bg-muted': open,
                  })}
                >
                  <SearchIcon className="size-5" />
                </Button>
              </PopoverTrigger>
              <Search setOpen={setOpen} />
            </Popover>

            <NavItem
              href="/"
              title="Home"
              icon={<HomeIcon />}
            />

            <NavItem
              href="/libary"
              title="My Games"
              icon={<LibraryIcon />}
            />
            <NavItem
              href="/settings"
              title="Settings"
              icon={<Settings2 />}
            />
          </nav>

          <nav className="flex flex-col flex-1 gap-3 p-2 border-t border-b">
            <NewGame />

            <RecentGame
              title={'Play Elden Ring'}
              thumbnail={'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.png'}
              id={0}
            />

            <RecentGame
              title={'Play Assassin’s creed'}
              thumbnail={'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rrw.png'}
              id={1}
            />
          </nav>

          <nav className="grid gap-2 p-2 mt-auto">
            <NavItem
              type="button"
              title="Notifications"
              icon={<BellIcon />}
            />
            <NavItem
              type="button"
              title="Downloads"
              icon={<ArrowDownToLine />}
            />
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default SideNavigation;
