import { Route, Routes } from "react-router-dom";
import { useContext } from "react";

import { PrivateLayout } from "@/components/layout/PrivateLayout";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { AuthContext } from "@/providers/AuthProvider";
import { Loader } from "@/components/Loader";

import { privateRoutes, publicRoutes } from "@/constants/routes";

const App = () => {
  const { isLoading, user } = useContext(AuthContext);

  if (isLoading) return <Loader />;

  return (
    <>
      <Routes>
        <Route element={<PrivateLayout />}>
          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Route>
        <Route element={<PublicLayout />}>
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
