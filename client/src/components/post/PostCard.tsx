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

import { MAX_SHOW_POST_CHARACTERS } from "@/constants";
import { IPost } from "@/types";

type Props = {
  post: IPost;
  isLast: boolean;
};

export const PostCard = ({ post, isLast }: Props) => {
  const { user: currentUser } = useContext(AuthContext);
  const [isTruncated, setIsTruncated] = useState(true);
  const navigate = useNavigate();

  const toggleTruncate = () => {
    setIsTruncated((prev) => !prev);
  };

  const onNavigate = (href: string) => navigate(href);

  if (!currentUser) return null;

  return (
    <>
      <div
        className="flex gap-3 px-1 w-full cursor-pointer"
        onClick={() => onNavigate(`/post/${post._id}`)}
      >
        <UserAvatar src={currentUser.avatar} username={currentUser.username} />
        <div className="flex flex-col w-full -my-1">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-x-2 py-1"
              onClick={() => onNavigate(`/profile/${currentUser.username}`)}
            >
              <span>{currentUser.fullName}</span>
              <span className="text-sm text-muted-foreground">
                @{currentUser.username}
              </span>
              <div className="size-1 rounded-full bg-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {timeSince(post.createdAt)}
              </span>
            </div>
            <div>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full text-muted-foreground"
              >
                <MoreHorizontalIcon className="size-5" />
              </Button>
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
                  onClick={toggleTruncate}
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
                className="rounded-xl border"
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
