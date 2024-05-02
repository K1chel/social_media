import { Route, Routes } from "react-router-dom";

import { NotFoundPage } from "@/pages/NotFoundPage";
import { PrivateLayout } from "@/components/layout/PrivateLayout";
import { PublicLayout } from "@/components/layout/PublicLayout";

import { privateRoutes, publicRoutes } from "@/constants/routes";

const App = () => {
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
