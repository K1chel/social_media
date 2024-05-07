import { LogOutIcon, UserIcon } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useLogout } from "@/hooks/useLogout";
import { AuthContext } from "@/providers/AuthProvider";
import { UserAvatar } from "@/components/UserAvatar";

export const UserMenu = () => {
  const { handleLogout, isLoading } = useLogout();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const onNavigate = (href: string) => navigate(href);

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <UserAvatar src={user.avatar} username={user.username} />
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={22} className="mr-6 w-[170px] p-0">
        <DropdownMenuItem
          disabled={isLoading}
          className="space-x-3 cursor-pointer rounded-none py-1.5 px-3"
          onClick={() => onNavigate(`/profile/${user.username}`)}
        >
          <UserIcon className="w-5 h-5" />
          <span>Profile</span>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem
          disabled={isLoading}
          className="space-x-3 cursor-pointer rounded-none py-1.5 px-3"
          onClick={handleLogout}
        >
          <LogOutIcon className="w-5 h-5" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
