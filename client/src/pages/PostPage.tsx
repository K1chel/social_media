import { postByIdSelector } from "@/atoms/postAtom";
import { PostCard } from "@/components/post/PostCard";
import { PostComment } from "@/components/post/PostComment";
import { PostReplyModal } from "@/components/post/PostReplyModal";
import { Separator } from "@/components/ui/separator";
import { Navigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

export const PostPage = () => {
  const { postId } = useParams<{ postId: string }>();

  const post = useRecoilValue(postByIdSelector(postId!));

  if (!post) return <Navigate to="/" />;

  return (
    <div className="max-w-3xl mx-auto w-full space-y-5 container py-3 mb-10">
      <PostCard post={post} isLast />
      <Separator />
      <h1 className="text-xl md:text-2xl font-medium">Comments:</h1>
      {post.comments.length ? (
        post.comments.map((comment, idx) => {
          const isLast =
            post.comments.indexOf(comment) === post.comments.length - 1;

          return <PostComment key={idx} comment={comment} isLast={isLast} />;
        })
      ) : (
        <div>
          <p>
            No comments yet.{" "}
            <PostReplyModal post={post}>
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
