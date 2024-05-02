import { Navigate, Outlet } from "react-router-dom";

export const PrivateLayout = () => {
  const user = true;

  return (
    <>
      {user ? (
        <div className="flex flex-col min-h-screen w-full">
          <nav className="fixed top-0 inset-x-0 h-20 border-b bg-background pl-0 md:pl-24 xl:pl-[220px]">
            navbar
          </nav>
          <aside className="border-r h-full hidden md:block fixed top-0 w-24 xl:w-[220px] bg-background">
            sidebar
          </aside>
          <main className="pl-0 md:pl-24 xl:pl-[220px] pt-20 flex flex-1">
            <Outlet />
          </main>
          <footer className="pl-0 md:pl-24 xl:pl-[220px] py-3 border-t">
            Footer
          </footer>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
