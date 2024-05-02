import { Navigate, Outlet } from "react-router-dom";

export const PublicLayout = () => {
  const user = false;

  return (
    <>
      {user ? (
        <Navigate to="/" />
      ) : (
        <div className="h-screen max-h-screen w-full flex items-center justify-center px-4">
          <main className="max-w-xl mx-auto w-full border-2 px-3 py-5 rounded shadow-lg">
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
};
