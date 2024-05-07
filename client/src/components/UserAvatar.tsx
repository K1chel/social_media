import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  src?: string;
  username: string;
  className?: string;
  onClick?: () => void;
  ref?: React.Ref<HTMLDivElement>;
};

export const UserAvatar = ({
  username,
  className,
  onClick,
  ref,
  src,
}: Props) => {
  return (
    <Avatar className={cn("border", className)} onClick={onClick} ref={ref}>
      <AvatarImage src={src} alt={username} className="object-cover" />
      <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
