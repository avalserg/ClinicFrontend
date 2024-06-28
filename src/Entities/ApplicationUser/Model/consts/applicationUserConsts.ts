

export enum ApplicationUserRoleName{
    ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
}
 export interface ApplicationUserRole {
  name: ApplicationUserRoleName;
 }
