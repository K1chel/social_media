import { useContext, useState } from "react";

import { AuthContext } from "@/providers/AuthProvider";
import { toast } from "sonner";

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUser, setToken } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      const data = await res.json();

      if (data.error) {
        toast.error("Failed to logout. Please try again");
        return;
      }

      setUser(null);
      setToken("");
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleLogout };
};
