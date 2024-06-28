import { createSelector } from "@reduxjs/toolkit";
import { type StateSchema } from "@/App/Providers/StoreProvider";
import { ApplicationUserRole, ApplicationUserRoleName } from "../consts/applicationUserConsts";

// common selector
export const getUserRoles = (state: StateSchema) => state.applicationUser.authData?.applicationUserRole;
// export const isUserAdmin = createSelector(getUserRoles, (role) =>
//   Boolean(role?.includes(ApplicationUserRole.ADMIN)),
// );
// export const isUserPatient = createSelector(getUserRoles, (role) =>
//   Boolean(role?.includes(ApplicationUserRole.PATIENT)),
// );
// export const isUserDoctor = createSelector(getUserRoles, (role) =>
//   Boolean(role?.includes(ApplicationUserRole.DOCTOR)),
// );
export const isUserAdmin = createSelector(getUserRoles, (role) =>
  Boolean(role?.name.toUpperCase()===ApplicationUserRoleName.ADMIN),
);
export const isUserPatient = createSelector(getUserRoles, (role) =>
  Boolean(role?.name.toUpperCase()===ApplicationUserRoleName.PATIENT),
);
export const isUserDoctor = createSelector(getUserRoles, (role) =>
  Boolean(role?.name.toUpperCase()===ApplicationUserRoleName.DOCTOR),
);
