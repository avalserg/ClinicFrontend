// eslint-disable-next-line avalserg-plugin/layer-imports
import { RouteProps } from "react-router-dom";
// eslint-disable-next-line avalserg-plugin/layer-imports
import { ApplicationUserRoleName } from "@/Entities/ApplicationUser";

export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
  roles?: ApplicationUserRoleName[];
};
