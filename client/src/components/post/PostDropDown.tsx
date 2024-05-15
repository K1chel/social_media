import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IPost, IUser } from "@/types";
import {
  CopyIcon,
  FlagIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ConfirmationAction } from "../ConfirmationAction";
import { useDeletePost } from "@/hooks/useDeletePost";

type Props = {
  post: IPost;
  user: IUser;
  currentUser: IUser;
};

export const PostDropDown = ({ post, currentUser, user }: Props) => {
  const { handleDeletePost, isLoading } = useDeletePost();

  const isOwner = currentUser._id === user._id;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full text-muted-foreground"
        >
          <MoreHorizontalIcon className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 lg:mr-20 mr-10 w-[160px]">
        <DropdownMenuItem className="p-2 rounded-none" disabled={isLoading}>
          <CopyIcon className="size-4 mr-2" />
          <span className="text-sm font-medium">Copy link</span>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem className="p-2 rounded-none" disabled={isLoading}>
          <FlagIcon className="size-4 mr-2" />
          <span className="text-sm font-medium">Report post</span>
        </DropdownMenuItem>
        {isOwner && (
          <>
            <Separator />
            <ConfirmationAction
              handleConfirm={() => handleDeletePost(post._id)}
              title="Are you sure?"
              description="This action cannot be undone"
            >
              <Button
                className="p-2 rounded-none w-full justify-start"
                variant="ghost"
                size="sm"
                disabled={isLoading}
              >
                <TrashIcon className="size-4 mr-2 text-red-500" />
                <span className="text-sm font-medium text-red-500">Delete</span>
              </Button>
            </ConfirmationAction>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
