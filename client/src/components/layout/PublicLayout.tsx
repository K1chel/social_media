import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "@/providers/AuthProvider";
import { ModeToggle } from "../ModeToggle";

export const PublicLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <Navigate to="/" />
      ) : (
        <div className="h-screen max-h-screen w-full flex items-center justify-center px-4">
          <main className="max-w-xl mx-auto w-full border-2 px-5 py-8 rounded shadow-lg">
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
};
