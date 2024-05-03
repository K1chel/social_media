import { createContext, useEffect, useState } from "react";

import { IUser } from "@/types";

type AuthContextType = {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  token: "",
  setToken: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      setToken("");
      setUser(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/current-user");
        const data = await res.json();

        if (data.error) {
          console.log(data.error);
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
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ isLoading, setIsLoading, setToken, setUser, token, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
