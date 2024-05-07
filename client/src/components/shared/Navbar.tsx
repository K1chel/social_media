import { BellIcon, GithubIcon, MenuIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { UserMenu } from "@/components/shared/UserMenu";
import { SearchBar } from "@/components/SearchBar";
import { ActionTooltip } from "../ActionTooltip";

export const Navbar = () => {
  return (
    <header className="h-full w-full flex items-center justify-between px-5">
      <div className="hidden md:flex items-center gap-x-3">
        <SearchBar />
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
        <ActionTooltip title="Notifications">
          <Button size="icon" variant="outline">
            <BellIcon className="w-5 h-5" />
          </Button>
        </ActionTooltip>
        <ActionTooltip title="GitHub">
          <Button size="icon" variant="outline">
            <GithubIcon className="w-5 h-5" />
          </Button>
        </ActionTooltip>
        <ActionTooltip title="Appearance">
          <div>
            <ModeToggle />
          </div>
        </ActionTooltip>
        <UserMenu />
      </div>
    </header>
  );
};