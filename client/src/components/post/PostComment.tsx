import { useGetUserById } from "@/hooks/useGetUserById";
import { Separator } from "../ui/separator";
import { UserAvatar } from "../UserAvatar";

type Props = {
  comment: {
    text: string;
    commentBy: string;
  };
  isLast: boolean;
};

export const PostComment = ({ comment, isLast }: Props) => {
  const { user, isLoading } = useGetUserById(comment.commentBy);

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
          <span className="text-sm md:text-base">{user.username}</span>
        </div>
        <div className="pl-10">
          <span>{comment.text}</span>
        </div>
      </div>
      {!isLast && <Separator />}
    </>
  );
};
