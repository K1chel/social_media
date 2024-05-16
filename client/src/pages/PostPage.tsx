import { postAtom, postByIdSelector } from "@/atoms/postAtom";
import { PostCard } from "@/components/post/PostCard";
import { PostComment } from "@/components/post/PostComment";
import { PostReplyModal } from "@/components/post/PostReplyModal";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { IPost } from "@/types";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "sonner";

export const PostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const [posts, setPosts] = useRecoilState<IPost[]>(postAtom);
  const [isLoading, setIsLoading] = useState(true);

  const currentPost = posts[0];

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const res = await fetch(`/api/posts/post/${postId}`);
        const data = await res.json();

        if (data.error) {
          toast.error(data.error);
          return;
        }

        setPosts([data]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentPost();
  }, [postId, setPosts]);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto w-full space-y-5 container py-3 mb-10">
        <PostCard.Skeleton />
        <Skeleton className="w-[140px] h-8" />
        <PostComment.Skeleton />
        <PostComment.Skeleton />
        <PostComment.Skeleton />
      </div>
    );
  }

  if (!currentPost) return null;

  return (
    <div className="max-w-3xl mx-auto w-full space-y-5 container py-3 mb-10">
      <PostCard post={currentPost} isLast />
      <Separator />
      <h1 className="text-xl md:text-2xl font-medium">Comments:</h1>
      {currentPost.comments.length ? (
        [...currentPost.comments]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((comment, idx) => {
            const isLast = idx === currentPost.comments.length - 1;

            return <PostComment key={idx} comment={comment} isLast={isLast} />;
          })
      ) : (
        <div>
          <p>
            No comments yet.{" "}
            <PostReplyModal post={currentPost}>
              <button className="text-blue-500">
                Reply first to this post.
              </button>
            </PostReplyModal>
          </p>
        </div>
      )}
    </div>
  );
};
