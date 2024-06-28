import { AdminProfile, DoctorProfile, PatientProfile, Profile } from "@/Entities/Profile";
import { ValidateProfileError } from "../consts/consts";

export interface ProfileSchema {
  // data from server
  data?: Profile;
  // store user changes
  form?: Profile;
  isLoading: boolean;
  isSuccessUpdate?: boolean;
  
  error?: string;
  readonly: boolean;
  validateErrors?: ValidateProfileError[];
}
export interface PatientProfileSchema {
  // data from server
  data?: PatientProfile;
  // store user changes
  form?: PatientProfile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
  isSuccessUpdate?: boolean;
  validateErrors?: ValidateProfileError[];
}
export interface DoctorProfileSchema {
    // data from server
    data?: DoctorProfile;
    // store user changes
    form?: DoctorProfile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    isSuccessUpdate?: boolean;
    validateErrors?: ValidateProfileError[];
}
export interface AdminProfileSchema {
    // data from server
    data?: AdminProfile;
    // store user changes
    form?: AdminProfile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    isSuccessUpdate?: boolean;
    validateErrors?: ValidateProfileError[];
}
