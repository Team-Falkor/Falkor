import { Button, buttonVariants } from '@/components/ui/button';
import { HomeIcon, LibraryIcon, SearchIcon, Settings2 } from 'lucide-react';

import bg from '@/assets/bg.jpeg';
import logo from '@/assets/icon.png';
import SideNavigationDownloads from '@/components/sideNavigation/downloads';
import NavItem from '@/components/sideNavigation/item';
import NewGame from '@/components/sideNavigation/newGame';
import RecentGame from '@/components/sideNavigation/recentGame';
import Search from '@/components/sideNavigation/search';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useShouldUpdateGamesUi } from '@/stores';
import { GameStoreHelper, GameStoreInfo } from '@/utils/stores';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

const SideNavigation = () => {
  const [open, setOpen] = useState(false);
  const [games, setGames] = useState<GameStoreInfo[]>([]);
  const { setShouldUpdateGamesUi, shouldUpdateGamesUi } = useShouldUpdateGamesUi();

  const getGames = async () => {
    const games = (await GameStoreHelper.getAll())
      ?.sort((a, b) => {
        if (!a.lastPlayed) return 1;
        if (!b.lastPlayed) return -1;
        if (a.lastPlayed === b.lastPlayed) return 0;
        if (a.lastPlayed < b.lastPlayed) return 1;
        if (a.lastPlayed > b.lastPlayed) return -1;
        return 0;
      })
      .slice(0, 6);
    setGames(games);

    setShouldUpdateGamesUi(false);
  };

  useEffect(() => {
    if (!shouldUpdateGamesUi) return;

    getGames();
  }, [shouldUpdateGamesUi]);

  return (
    <aside className="fixed left-0 z-20 flex flex-col h-full border-r inset-y">
      <div className="relative w-full h-full">
        <img
          src={bg}
          className="absolute inset-0 z-10 object-cover object-center w-full h-full opacity-10"
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
                    className="size-9"
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Falkor The luck of the draw</TooltipContent>
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

            {games.map((game) => (
              <RecentGame
                key={game.id}
                id={game.id}
                title={game.name}
                thumbnail={game.icon}
                path={game.path}
              />
            ))}
          </nav>

          <nav className="grid gap-2 p-2">
            {/* <NavItem
              type="button"
              title="Notifications"
              icon={<BellIcon />}
            /> */}

            <SideNavigationDownloads />
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default SideNavigation;
