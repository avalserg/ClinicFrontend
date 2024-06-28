/* eslint-disable multiline-ternary */
import { Suspense, memo, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { AppRouteProps } from "@/Shared/Types/router";
import { routeConfig } from "../config/routeConfig";
import { PageLoader } from "@/Widgets/PageLoader";

import { RequireAuth } from "./RequireAuth";

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRouteProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
    );
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? (
            <RequireAuth roles={route.roles}>{element}</RequireAuth>
          ) : (
            element
          )
        }
      />
    );
  }, []);
  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
