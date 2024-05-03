import { BellIcon, GithubIcon, MenuIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { UserMenu } from "@/components/shared/UserMenu";

export const Navbar = () => {
  return (
    <header className="h-full w-full flex items-center justify-between px-5">
      <div className="hidden md:flex items-center gap-x-3">
        <p>LOGO</p>
        <p>SEARCH</p>
      </div>
      <div className="flex md:hidden items-center gap-x-2">
        <Button size="icon" variant="ghost">
          <MenuIcon />
        </Button>
        <Button size="icon" variant="ghost">
          <SearchIcon />
        </Button>
      </div>
      <div className="flex items-center gap-x-3">
        <Button size="icon" variant="outline">
          <BellIcon className="w-5 h-5" />
        </Button>
        <Button size="icon" variant="outline">
          <GithubIcon className="w-5 h-5" />
        </Button>
        <ModeToggle />
        <UserMenu />
      </div>
    </header>
  );
};
