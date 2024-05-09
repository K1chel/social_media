import { useContext, useState } from "react";
import { toast } from "sonner";

import { AuthContext } from "@/providers/AuthProvider";
import { IUser } from "@/types";

export const useFollowUnfollow = (user: IUser) => {
  const { user: currentUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(
    user?.followers?.includes(currentUser?._id ?? "") ?? false
  );

  const apiEndpoint = isFollowing ? "unfollow" : "follow";

  const handleFollowUnfollow = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/users/${apiEndpoint}/${user._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }

      if (isFollowing) {
        toast.success(`Unfollowed ${user.username}`);
        user.followers.pop();
      } else {
        toast.success(`Followed ${user.username}`);
        user.followers.push(currentUser?._id ?? "");
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isFollowing, handleFollowUnfollow };
};
