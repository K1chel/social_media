import { useGetUserById } from "@/hooks/useGetUserById";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/UserAvatar";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  comment: {
    text: string;
    commentBy: string;
    createdAt: string;
  };
  isLast: boolean;
};

export const PostComment = ({ comment, isLast }: Props) => {
  const { user } = useGetUserById(comment.commentBy);

  if (!user) return null;

  return (
    <>
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2">
          <UserAvatar
            src={user.avatar}
            username={user.username}
            className="size-8"
          />
          <div className="flex items-center gap-x-2">
            <span className="">{user.fullName}</span>
            <div className="size-1 bg-muted-foreground rounded-full" />
            <span className="text-sm md:text-base text-muted-foreground">
              {user.username}
            </span>
          </div>
        </div>
        <div className="pl-10">
          <span>{comment.text}</span>
        </div>
      </div>
      {!isLast && <Separator />}
    </>
  );
};

PostComment.Skeleton = function PostCommentSkeleton() {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-2">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="w-[100px] h-5" />
      </div>
      <div className="flex flex-col gap-y-2 w-full pl-10">
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-6" />
      </div>
    </div>
  );
};
