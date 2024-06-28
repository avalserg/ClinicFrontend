import { FeatureFlags } from "@/Shared/Types/featureFlags";
import { JsonSettings } from "./jsonSettings";
import { ApplicationUserRole } from "../consts/applicationUserConsts";

export interface ApplicationUser {
  
  applicationUserId: string;
  login: string;
  // applicationUserRoleId: string;
  applicationUserRole: ApplicationUserRole;
  // ************
  avatar?: string;
  features?: FeatureFlags;
  jsonSettings?: JsonSettings;
  // jwtToken?: string;
}
export interface ApplicationUserSchema {
  // if authData undefined so User unauthorized
  authData?: ApplicationUser;
  // **********
  _inited: boolean;
}
