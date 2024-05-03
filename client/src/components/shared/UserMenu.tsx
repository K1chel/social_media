import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useLogout } from "@/hooks/useLogout";
import { LogOutIcon } from "lucide-react";

export const UserMenu = () => {
  const { handleLogout, isLoading } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <p>avatar</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={22} className="mr-6 w-[170px] p-0">
        <DropdownMenuItem
          disabled={isLoading}
          className="space-x-3 cursor-pointer rounded-none py-1.5 px-3"
        ></DropdownMenuItem>
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
