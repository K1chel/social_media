import { LucideIcon } from "lucide-react";
import { ActionTooltip } from "../ActionTooltip";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  href?: string;
  icon: LucideIcon;
  onClick?: () => void;
  isMobile?: boolean;
};

export const SidebarItem = ({
  href,
  icon: Icon,
  label,
  onClick,
  isMobile,
}: Props) => {
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const location = useLocation();

  const isActive = activeLink === href;

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <ActionTooltip
      title={label}
      className={cn("xl:hidden block", isMobile && "hidden")}
      align="center"
      side="right"
      sideOffset={10}
    >
      <Link to={href ? href : ""}>
        <Button
          className={cn(
            "w-full flex items-center gap-x-3 xl:justify-start justify-center",
            isMobile && "justify-start"
          )}
          variant={isActive ? "secondary" : "ghost"}
          onClick={onClick}
        >
          <Icon className="w-5 h-5" />
          <span className={cn("hidden xl:block", isMobile && "block")}>
            {label}
          </span>
        </Button>
      </Link>
    </ActionTooltip>
  );
};
