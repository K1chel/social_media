import { useContext } from "react";
import { Loader2Icon } from "lucide-react";
import { Link } from "react-router-dom";

import { UserAvatar } from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthContext } from "@/providers/AuthProvider";
import { useFollowUnfollow } from "@/hooks/useFollowUnfollow";

import { IUser } from "@/types";
import { getIconAndLabelFromLink } from "@/lib/utils";

type Props = {
  user: IUser;
};

export const UserHeader = ({ user }: Props) => {
  const { user: currentUser } = useContext(AuthContext);
  const { handleFollowUnfollow, isFollowing, isLoading } =
    useFollowUnfollow(user);

  if (!currentUser) return null;

  const isOwner = currentUser._id === user._id;

  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-4 ">
      <UserAvatar
        src={user.avatar}
        username={user.username}
        className="h-24 w-24 md:h-32 md:w-32"
      />
      <div className="text-center">
        <h1 className="text-2xl font-bold md:text-3xl">{user.fullName}</h1>
        <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
        {user.bio ? (
          <p className="mt-2 max-w-md text-xs md:text-sm text-gray-500 dark:text-gray-400">
            {user.bio}
          </p>
        ) : null}
        {user.links?.length ? (
          <div className="mt-3 flex items-center justify-center max-w-xl mx-auto w-full gap-x-1">
            {user.links.map((link) => {
              const { icon: Icon, label } = getIconAndLabelFromLink(link);
              return (
                <Button
                  key={link}
                  size="sm"
                  variant="link"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  <Link
                    to={link}
                    target="_blank"
                    className="flex items-center gap-x-1"
                  >
                    <Icon className="size-4 shrink-0" />
                    <p className="text-sm">{label}</p>
                  </Link>
                </Button>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="flex items-center justify-center gap-x-10">
        <div className="flex flex-col items-center justify-center space-y-1">
          <span className="text-xl md:text-2xl font-bold">
            {user.followers.length}
          </span>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            Follower{user.followers.length > 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-1">
          <span className="text-xl md:text-2xl font-bold">
            {user.following.length}
          </span>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            Following
          </p>
        </div>
      </div>
      <div className="w-full flex items-center justify-center max-w-[250px]">
        {isOwner ? (
          <Link to={`/profile/${currentUser.username}/update`}>
            <Button disabled={isLoading} className="w-full">
              Update Profile
            </Button>
          </Link>
        ) : (
          <Button
            disabled={isLoading}
            onClick={handleFollowUnfollow}
            className="w-full"
          >
            {isLoading ? (
              <div className="text-muted-foreground flex items-center gap-x-2">
                <Loader2Icon className="animate-spin h-5 w-5" />
                <span>Loading...</span>
              </div>
            ) : isFollowing ? (
              "Unfollow"
            ) : (
              "Follow"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

UserHeader.Skeleton = function UserHeaderSkeleton() {
  return (
    <div className="w-full flex flex-col items-center  gap-y-4 py-5 lg:py-12">
      <Skeleton className="h-24 w-24 md:h-32 md:w-32 rounded-full" />
      <div className="flex items-center justify-center flex-col gap-y-3">
        <Skeleton className="w-[200px] h-10" />
        <Skeleton className="w-[100px] h-10" />
      </div>
      <div className="max-w-[350px] mx-auto w-full">
        <Skeleton className="h-20 w-full" />
      </div>
      <div className="flex items-center justify-center gap-x-10">
        <Skeleton className="w-[60px] h-10" />
        <Skeleton className="w-[60px] h-10" />
      </div>
      <div className="w-full flex items-center justify-center max-w-[250px]">
        <Skeleton className="w-full h-12" />
      </div>
    </div>
  );
};
