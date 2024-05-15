import { useEffect, useState } from "react";

import { IUser } from "@/types";
import { toast } from "sonner";

export const useGetUserById = (userId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/user/${userId}`);
        const data = await res.json();

        if (data.error) {
          toast.error(data.error);
          return;
        }

        setUser(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { isLoading, user };
};
