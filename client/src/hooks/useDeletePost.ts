import { useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "sonner";

import { postAtom } from "@/atoms/postAtom";

export const useDeletePost = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useRecoilState(postAtom);

  const handleDeletePost = async (postId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/posts/delete/${postId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success("Post deleted successfully");
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting the post");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleDeletePost };
};
