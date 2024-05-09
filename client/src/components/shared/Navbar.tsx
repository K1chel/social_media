import { BellIcon, GithubIcon, SearchIcon } from "lucide-react";

import { ModeToggle } from "@/components/ModeToggle";
import { SearchBar } from "@/components/SearchBar";
import { UserMenu } from "@/components/shared/UserMenu";
import { Button } from "@/components/ui/button";
import { ActionTooltip } from "@/components/ActionTooltip";
import { MobileSidebar } from "@/components/shared/MobileSidebar";

export const Navbar = () => {
  return (
    <header className="h-full w-full flex items-center justify-between px-5">
      <div className="hidden md:flex items-center gap-x-3">
        <SearchBar />
      </div>
      <div className="flex md:hidden items-center gap-x-2">
        <MobileSidebar />
        <Button size="icon" variant="ghost">
          <SearchIcon />
        </Button>
      </div>
      <div className="flex items-center gap-x-3">
        <ActionTooltip title="Notifications" className="hidden lg:block">
          <Button size="icon" variant="outline">
            <BellIcon className="w-5 h-5" />
          </Button>
        </ActionTooltip>
        <ActionTooltip title="GitHub" className="hidden lg:block">
          <Button size="icon" variant="outline">
            <GithubIcon className="w-5 h-5" />
          </Button>
        </ActionTooltip>
        <ActionTooltip title="Appearance" className="hidden lg:block">
          <div>
            <ModeToggle />
          </div>
        </ActionTooltip>
        <UserMenu />
      </div>
    </header>
  );
};
