import { LogOutIcon, UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";
import { ActionTooltip } from "../ActionTooltip";
import { sidebarLinks } from "@/constants";
import { SidebarItem } from "./SidebarItem";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";

export const Sidebar = () => {
  const { handleLogout, isLoading } = useLogout();
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className="flex flex-col h-full">
      <Link
        to="/"
        className="h-20 flex items-center xl:justify-start justify-center px-3 gap-x-2"
      >
        <img src="/logo.svg" alt="Logo" className="xl:w-12 xl:h-12 w-10 h-10" />
        <h5 className="text-xl hidden xl:block font-semibold">Social Media</h5>
      </Link>
      <div className="px-2 py-4 flex-1 flex flex-col gap-y-2">
        {sidebarLinks.map((link) => (
          <SidebarItem
            key={link.href}
            href={link.href}
            label={link.label}
            icon={link.icon}
          />
        ))}
        <SidebarItem
          href={`/profile/${user.username}`}
          label="Profile"
          icon={UserIcon}
        />
      </div>
      <div className="py-4 px-2 w-full">
        <SidebarItem label="Logout" icon={LogOutIcon} onClick={handleLogout} />
      </div>
    </div>
  );
};
