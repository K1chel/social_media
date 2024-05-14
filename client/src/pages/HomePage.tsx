import { postAtom } from "@/atoms/postAtom";
import { CreatePost } from "@/components/post/CreatePost";
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

  if (isLoading) return <p>loading...</p>;

  return (
    <div className="max-w-3xl mx-auto w-full space-y-5 container py-5">
      <CreatePost />
      {!isLoading && posts.length === 0 ? (
        <p>no posts</p>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post._id}>
              <p>{post.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
