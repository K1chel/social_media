import { postAtom } from "@/atoms/postAtom";
import { CreatePost } from "@/components/post/CreatePost";
import { PostCard } from "@/components/post/PostCard";
import { IPost } from "@/types";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRecoilState } from "recoil";
import { toast } from "sonner";

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useRecoilState<IPost[]>(postAtom);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/posts/get-all");
        const data = await res.json();

        if (data.error) {
          toast.error(data.error);
        }

        setPosts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [setPosts]);

  if (isLoading)
    return (
      <div className="max-w-3xl mx-auto w-full space-y-5 container py-3 mb-10 cursor-not-allowed">
        <CreatePost.Skeleton />
        <PostCard.Skeleton />
        <PostCard.Skeleton />
        <PostCard.Skeleton />
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto w-full space-y-5 container py-3 mb-10">
      <CreatePost />
      {!isLoading && posts.length === 0 ? (
        <p>no posts</p>
      ) : (
        <div className="space-y-5">
          {posts.map((post) => {
            const isLast = posts[posts.length - 1]._id === post._id;
            return <PostCard key={post._id} post={post} isLast={isLast} />;
          })}
        </div>
      )}
    </div>
  );
};
