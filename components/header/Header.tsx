import { Navigation } from './Navigation';
import { ModeToggle } from './ModeToggle';

export const Header = () => {
  return (
    <header className="supports-backdrop-blur:bg-background/60 fixed top-0 z-40 w-full h-[--header-height] px-8 border-b bg-background/95 backdrop-blur">
      <div className="flex h-full items-center">
        <Navigation />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
