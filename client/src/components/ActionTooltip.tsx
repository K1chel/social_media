import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  title: string;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  className?: string;
};

export const ActionTooltip = ({
  children,
  title,
  align,
  side,
  sideOffset,
  className,
}: Props) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          align={align}
          className={cn("", className)}
        >
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
