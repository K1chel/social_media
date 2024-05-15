import { useContext } from "react";

import { useOpenCreatePostStore } from "@/hooks/store/useOpenCreatePostStore";
import { AuthContext } from "@/providers/AuthProvider";
import { UserAvatar } from "../UserAvatar";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export const CreatePost = () => {
  const { user } = useContext(AuthContext);
  const { onOpen } = useOpenCreatePostStore();

  if (!user) return null;

  return (
    <div
      className="w-full relative flex items-center justify-between gap-x-2 border-b px-1 sm:py-2 py-3 cursor-pointer"
      onClick={onOpen}
    >
      <div className="flex items-center gap-x-3">
        <UserAvatar src={user.avatar} username={user.username} />
        <div className="text-sm text-muted-foreground">Create a post...</div>
      </div>
      <Button size="sm">Post</Button>
    </div>
  );
};

CreatePost.Skeleton = function CreatePostSkeleton() {
  return (
    <div className="w-full relative flex items-center justify-between gap-x-2 border-b px-1 sm:py-2 py-3 cursor-not-allowed">
      <div className="flex items-center gap-x-3">
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="w-[150px] h-7" />
      </div>
      <Skeleton className="w-[55px] h-9" />
    </div>
  );
};
