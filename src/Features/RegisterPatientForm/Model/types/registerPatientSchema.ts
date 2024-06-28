import { ValidateCreatePatientError } from "../consts/consts";

export interface RegisterPatientSchema {
  login: string;
  passport:string
  password: string;
  firstName: string,
  lastName: string,
  patronymic: string,
  dateBirthday?: string,
  address: string,
  phoneNumber: string,
  avatar?: "string"
  isLoading: boolean;
  error?: string;
  validateErrors?: ValidateCreatePatientError[];
}

// export interface AuthResponse{
//   refreshToken: string;
//   jwtToken: string;
//   expires: Date;
//   applicationUser: ApplicationUser;
  
// }