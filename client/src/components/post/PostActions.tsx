import { BookmarkIcon, HeartIcon, MessageSquareIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { IPost } from "@/types";
import { PostReplyModal } from "./PostReplyModal";

type Props = {
  post: IPost;
};

export const PostActions = ({ post }: Props) => {
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
          >
            <HeartIcon className="size-5" />
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
        <Button size="icon" variant="ghost" className="w-auto h-auto p-2">
          <BookmarkIcon className="size-5" />
        </Button>
      </div>
    </div>
  );
};
