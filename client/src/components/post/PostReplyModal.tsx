import { useContext, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useGetUserById } from "@/hooks/useGetUserById";
import { timeSince } from "@/lib/utils";
import { AuthContext } from "@/providers/AuthProvider";
import { UserAvatar } from "../UserAvatar";

import { postAtom } from "@/atoms/postAtom";
import { IPost } from "@/types";
import { useRecoilState } from "recoil";
import { toast } from "sonner";
import { Button } from "../ui/button";

type Props = {
  children: React.ReactNode;
  post: IPost;
};

export const PostReplyModal = ({ children, post }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [replyValue, setReplyValue] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [posts, setPosts] = useRecoilState<IPost[]>(postAtom);

  const { isLoading, user } = useGetUserById(post.postedBy);
  const { user: currentUser } = useContext(AuthContext);

  const onCloseModal = () => setIsOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/posts/reply/${post._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: replyValue }),
      });

      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }

      setPosts((prevPosts) => {
        const postIndex = prevPosts.findIndex((p) => p._id === post._id);
        if (postIndex !== -1) {
          return [
            ...prevPosts.slice(0, postIndex),
            data,
            ...prevPosts.slice(postIndex + 1),
          ];
        }
        return prevPosts;
      });
      setReplyValue("");
      onCloseModal();
    } catch (error) {
      toast.error("Failed to reply to post");
    } finally {
      setIsReplying(false);
    }
  };

  if (!user || !currentUser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <>
          <div className="flex flex-row gap-x-3 w-full">
            <div className="flex items-center flex-col gap-y-1">
              <UserAvatar src={user.avatar} username={user.username} />
              <div className="w-px h-full bg-muted-foreground" />
            </div>
            <div className="flex flex-col gap-y-1 py-0.5">
              <div className="flex items-center gap-x-2">
                <span>{user.fullName}</span>
                <span className="text-sm text-muted-foreground">
                  @{user.username}
                </span>
                <div className="size-1 rounded-full bg-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {timeSince(post.createdAt)}
                </span>
              </div>
              {post.text && (
                <div>
                  <p className="text-sm line-clamp-3">{post.text}</p>
                </div>
              )}
              {post.imageSrc && (
                <div className="mt-1">
                  <img
                    src={post.imageSrc}
                    alt="post"
                    className="object-cover w-1/2 rounded-lg border"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-x-3 w-full">
            <UserAvatar
              src={currentUser.avatar}
              username={currentUser.username}
            />
            <form className="w-full" onSubmit={handleSubmit}>
              <TextareaAutosize
                value={replyValue}
                onChange={(e) => setReplyValue(e.target.value)}
                placeholder="Reply to this post..."
                className="w-full bg-background resize-none outline-none text-lg font-medium"
                maxRows={5}
                disabled={isReplying}
              />
              <div className="flex justify-end mt-3">
                <Button size="sm" className="w-[80px]" disabled={isReplying}>
                  {isReplying ? "Replying..." : "Reply"}
                </Button>
              </div>
            </form>
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
};
