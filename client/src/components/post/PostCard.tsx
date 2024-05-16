import {
  ChevronDownIcon,
  ChevronUpIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Image } from "@/components/Image";
import { UserAvatar } from "@/components/UserAvatar";
import { PostActions } from "@/components/post/PostActions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { timeSince } from "@/lib/utils";
import { AuthContext } from "@/providers/AuthProvider";
import { useGetUserById } from "@/hooks/useGetUserById";
import { Skeleton } from "@/components/ui/skeleton";

import { MAX_SHOW_POST_CHARACTERS } from "@/constants";
import { IPost } from "@/types";
import { PostDropDown } from "./PostDropDown";

type Props = {
  post: IPost;
  isLast: boolean;
};

export const PostCard = ({ post, isLast }: Props) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const { user: currentUser } = useContext(AuthContext);
  const { isLoading, user } = useGetUserById(post.postedBy);

  const navigate = useNavigate();

  const toggleTruncate = () => {
    setIsTruncated((prev) => !prev);
  };

  const onNavigate = (href: string) => navigate(href);

  if (isLoading) return <PostCard.Skeleton />;

  if (!currentUser || !user || isLoading) return null;

  return (
    <>
      <div
        className="flex gap-3 px-1 w-full cursor-pointer"
        onClick={() => onNavigate(`/post/${post._id}`)}
      >
        <div
          className="size-10 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(`/profile/${user.username}`);
          }}
        >
          <UserAvatar src={user.avatar} username={user.username} />
        </div>
        <div className="flex flex-col w-full -my-1">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-x-2 py-1"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(`/profile/${user.username}`);
              }}
            >
              <span>{user.fullName}</span>
              <span className="text-sm text-muted-foreground">
                @{user.username}
              </span>
              <div className="size-1 rounded-full bg-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {timeSince(post.createdAt)}
              </span>
            </div>
            <div>
              <div onClick={(e) => e.stopPropagation()}>
                <PostDropDown
                  post={post}
                  currentUser={currentUser}
                  user={user}
                />
              </div>
            </div>
          </div>
          {post.text && (
            <div>
              <p className="tetx-[15px] leading-[20px]  font-[400]">
                {isTruncated
                  ? `${post.text.slice(0, MAX_SHOW_POST_CHARACTERS)}${
                      post.text.length > MAX_SHOW_POST_CHARACTERS ? "..." : ""
                    }`
                  : post.text}
              </p>
              {post.text.length > MAX_SHOW_POST_CHARACTERS && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTruncate();
                  }}
                  className="text-sm text-muted-foreground  hover:text-primary transition"
                >
                  {isTruncated ? (
                    <div className="flex items-center">
                      <p>Read more</p>
                      <ChevronDownIcon className="size-4" />
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <p>Show less</p>
                      <ChevronUpIcon className="size-4" />
                    </div>
                  )}
                </button>
              )}
            </div>
          )}
          {post.imageSrc && (
            <div className="mt-3">
              <Image
                src={post.imageSrc}
                alt="Image"
                className="rounded-xl border max-h-[450px]"
              />
            </div>
          )}
          <PostActions post={post} />
        </div>
      </div>
      {!isLast && <Separator />}
    </>
  );
};

PostCard.Skeleton = function PostCardSkeleton() {
  return (
    <div className="p-1 flex gap-x-2 w-full">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex flex-col gap-y-3 w-full">
        <div className="flex items-center gap-x-2">
          <Skeleton className="w-[80px] h-5" />
          <Skeleton className="w-[40px] h-5" />
          <Skeleton className="w-[20px] h-5" />
        </div>
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-6" />
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
          </div>
          <Skeleton className="size-8" />
        </div>
      </div>
    </div>
  );
};
