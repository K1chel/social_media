import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "@/providers/AuthProvider";
import { Navbar } from "@/components/shared/Navbar";
import { Sidebar } from "@/components/shared/Sidebar";
import { Footer } from "@/components/shared/Footer";

export const PrivateLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <div className="flex flex-col min-h-screen w-full">
          <nav className="fixed top-0 inset-x-0 h-20 border-b bg-background pl-0 md:pl-20 xl:pl-[220px]">
            <Navbar />
          </nav>
          <aside className="border-r h-full hidden md:block fixed top-0 w-20 xl:w-[220px] bg-background">
            <Sidebar />
          </aside>
          <main className="pl-0 md:pl-20 xl:pl-[220px] pt-20 flex flex-1">
            <Outlet />
          </main>
          <footer className="pl-0 md:pl-20 xl:pl-[220px] py-3 border-t">
            <Footer />
          </footer>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
