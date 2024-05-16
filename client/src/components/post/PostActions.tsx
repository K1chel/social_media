import { BookmarkIcon, HeartIcon, MessageSquareIcon } from "lucide-react";

import { PostReplyModal } from "@/components/post/PostReplyModal";
import { Button } from "@/components/ui/button";

import { postAtom } from "@/atoms/postAtom";
import { cn } from "@/lib/utils";
import { AuthContext } from "@/providers/AuthProvider";
import { IPost } from "@/types";
import { useContext, useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "sonner";

type Props = {
  post: IPost;
};

export const PostActions = ({ post }: Props) => {
  const { user: currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useRecoilState<IPost[]>(postAtom);

  const [isLiked, setIsLiked] = useState<boolean>(
    post.likes.includes(currentUser?._id as string)
  );
  const [isSaved, setIsSaved] = useState<boolean>(
    post.saves.includes(currentUser?._id as string)
  );
  const [isLikingLoading, setIsLikingLoading] = useState<boolean>(false);
  const [isSavingLoading, setIsSavingLoading] = useState<boolean>(false);

  const handleLikeUnlike = async () => {
    if (!currentUser) return toast.error("You need to login to like a post");
    if (isLikingLoading) return;
    setIsLikingLoading(true);
    try {
      const res = await fetch(`/api/posts/like-unlike/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) return toast.error(data.error);

      if (!isLiked) {
        const updatedPosts = posts.map((p) => {
          if (p._id === post._id) {
            return { ...p, likes: [...p.likes, currentUser._id] };
          }
          return p;
        });
        setPosts(updatedPosts);
      } else {
        const updatedPosts = posts.map((p) => {
          if (p._id === post._id) {
            return {
              ...p,
              likes: p.likes.filter((id) => id !== currentUser._id),
            };
          }
          return p;
        });
        setPosts(updatedPosts);
      }

      setIsLiked(!isLiked);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLikingLoading(false);
    }
  };

  const handleSaveUnsave = async () => {
    if (!currentUser) return toast.error("You need to login to save a post");
    if (isSavingLoading) return;
    setIsSavingLoading(true);
    try {
      const res = await fetch(`/api/posts/save-unsave/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) return toast.error(data.error);

      if (!isSaved) {
        const updatedPosts = posts.map((p) => {
          if (p._id === post._id) {
            return { ...p, saves: [...p.saves, currentUser._id] };
          }
          return p;
        });
        setPosts(updatedPosts);
      } else {
        const updatedPosts = posts.map((p) => {
          if (p._id === post._id) {
            return {
              ...p,
              saves: p.saves.filter((id) => id !== currentUser._id),
            };
          }
          return p;
        });
        setPosts(updatedPosts);
      }

      setIsSaved(!isSaved);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSavingLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-between pt-3 cursor-default"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-x-3">
        <div className="flex  items-center gap-x-1 group">
          <Button
            size="icon"
            variant="ghost"
            className="w-auto h-auto p-2 rounded-full"
            onClick={handleLikeUnlike}
            disabled={isLikingLoading}
          >
            <HeartIcon
              className={cn("size-5", isLiked && "text-red-500 fill-red-500")}
            />
          </Button>
          <span className="text-sm text-muted-foreground group-hover:text-primary transition">
            {post.likes.length}
          </span>
        </div>
        <div className="flex  items-center gap-x-1 group">
          <PostReplyModal post={post}>
            <Button
              size="icon"
              variant="ghost"
              className="w-auto h-auto p-2 rounded-full"
            >
              <MessageSquareIcon className="size-5" />
            </Button>
          </PostReplyModal>
          <span className="text-sm text-muted-foreground group-hover:text-primary transition">
            {post.comments.length}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <Button
          size="icon"
          variant="ghost"
          className="w-auto h-auto p-2"
          onClick={handleSaveUnsave}
          disabled={isSavingLoading}
        >
          <BookmarkIcon
            className={cn("size-5", isSaved && "fill-amber-400 text-amber-400")}
          />
        </Button>
      </div>
    </div>
  );
};
