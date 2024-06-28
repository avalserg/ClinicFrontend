import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getRouteForbidden, getRouteMain } from "@/Shared/const/router";
import { ApplicationUserRoleName, getUserAuthData, getUserRoles } from "@/Entities/ApplicationUser";

interface RequireAuthProps {
  children: JSX.Element;
  roles?: ApplicationUserRoleName[];
}
export function RequireAuth({ children, roles }: RequireAuthProps) {
  // get info about user auth or not
  const auth = useSelector(getUserAuthData);
  const location = useLocation();
  const userRoles = useSelector(getUserRoles);
  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      return true;
    }
    // some one value is true
    return roles.some((requiredRole) => {
      const hasRole = userRoles?.name.toUpperCase().includes(requiredRole);
      return hasRole;
    });
  }, [roles, userRoles]);

  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
  }
  if (!hasRequiredRoles) {
    return (
      <Navigate to={getRouteForbidden()} state={{ from: location }} replace />
    );
  }
  return children;
}
