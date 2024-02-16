import { memo } from 'react';
import { Route, Routes } from 'react-router-dom';

import { homeRoutes } from "./HomeRoutes";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { TopPage } from "../components/pages/TopPage";
import { Page404 } from "../components/pages/Page404";
import { LoginUserProvider } from "../providers/LoginUserProvider";
import { UserCreatePage } from '../components/pages/UserCreatePage';

export const Router = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<LoginUserProvider><TopPage /></LoginUserProvider>} />
      <Route path="/userCreate" element={<UserCreatePage />} />
      {homeRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<LoginUserProvider><HeaderLayout>{route.children}</HeaderLayout></LoginUserProvider>}
        />
      ))}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
});
