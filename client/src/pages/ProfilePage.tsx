import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { UserHeader } from "@/components/user/UserHeader";
import { UserPostsTabSelector } from "@/components/user/UserPostsTabSelector";

import { IUser } from "@/types";
import { postTabSelections } from "@/constants";

export const ProfilePage = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<string>(
    postTabSelections[0].values
  );
  const { username } = useParams();

  // TODO: Check why this useEffect runs twice
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();

        if (data.error) {
          return toast.error(data.error);
        }

        setUser(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (isLoading) return <UserHeader.Skeleton />;

  if (!user) return <Navigate to="/404" />;

  console.log({ selectedTab });

  return (
    <div className="max-w-5xl mx-auto w-full h-full px-5 space-y-2">
      <UserHeader user={user} />
      <UserPostsTabSelector
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
    </div>
  );
};
