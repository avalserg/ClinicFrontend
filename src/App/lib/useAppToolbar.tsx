import { ReactElement } from "react";
import { AppRoutes } from "@/Shared/const/router";
import { useRouteChange } from "@/Shared/lib/router/useRouteChange";
import { ScrollToolBar } from "@/Widgets/ScrollToolBar";

// сопостоавляет Toolbar и Route текущий
export function useAppToolbar() {
  const appRoute = useRouteChange();
  const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
    [AppRoutes.ARTICLES]: <ScrollToolBar />,
    [AppRoutes.ARTICLE_DETAILS]: <ScrollToolBar />,
  };
  return toolbarByAppRoute[appRoute];
}
