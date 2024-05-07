import { LucideIcon } from "lucide-react";
import { ActionTooltip } from "../ActionTooltip";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

type Props = {
  label: string;
  href?: string;
  icon: LucideIcon;
  onClick?: () => void;
};

export const SidebarItem = ({ href, icon: Icon, label, onClick }: Props) => {
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const location = useLocation();

  const isActive = activeLink === href;

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <ActionTooltip
      title={label}
      className="xl:hidden block"
      align="center"
      side="right"
      sideOffset={10}
    >
      <Link to={href ? href : ""}>
        <Button
          className="w-full flex items-center gap-x-3 xl:justify-start justify-center"
          variant={isActive ? "secondary" : "ghost"}
          onClick={onClick}
        >
          <Icon className="w-5 h-5" />
          <span className="hidden xl:block">{label}</span>
        </Button>
      </Link>
    </ActionTooltip>
  );
};
