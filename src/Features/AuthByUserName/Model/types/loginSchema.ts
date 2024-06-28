import { ApplicationUser } from "@/Entities/ApplicationUser";

export interface LoginSchema {
  login: string;
  password: string;
  isLoading: boolean;
  error?: string;
}

export interface AuthResponse{
  refreshToken: string;
  jwtToken: string;
  expires: Date;

   applicationUser: ApplicationUser;
  // login: string;
  // applicationUserRole?: string;
}