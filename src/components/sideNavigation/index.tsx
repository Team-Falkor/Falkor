import { buttonVariants } from '@/components/ui/button';
import { ArrowDownToLine, BellIcon, HomeIcon, LibraryIcon, SearchIcon, Settings2 } from 'lucide-react';

import bg from '@/assets/bg.png';
import logo from '@/assets/icon.png';
import NavItem from '@/components/sideNavigation/item';
import RecentGame from '@/components/sideNavigation/recentGame';
import { Link } from '@tanstack/react-router';

const SideNavigation = () => {
  return (
    <aside className="fixed left-0 z-20 inset-y">
      <div className="relative w-full h-full">
        <img
          src={bg}
          className="absolute inset-0 z-10 object-cover w-full h-full opacity-5"
        />

        <div className="relative z-20 flex flex-col h-screen overflow-hidden border-r bg-opacity-5">
          <div className="p-2 border-b">
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
          </div>
          <nav className="grid gap-2 p-2">
            <NavItem
              type="button"
              title="Search"
              icon={<SearchIcon />}
            />

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
            <RecentGame
              title={'Play Elden Ring'}
              thumbnail={'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.png'}
            />

            <RecentGame
              title={'Play Assassin’s creed'}
              thumbnail={'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rrw.png'}
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
