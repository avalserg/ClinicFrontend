interface FullName {
  firstName: string;
  lastName: string;
  patronymic: string;
 
}
interface PhoneNumber {
   value: string;
}

// export interface Patient {  
//   id: string;
//   fullName: FullName;
//   dateBirthday: Date;
//   address: string;
//   phoneNumber: PhoneNumber;
//   avatar?: string;
//   applicationUserId: string;
//   passportNumber?:string;
// }
export interface Patient {
    id: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    dateBirthday: Date;
    address: string;
    phoneNumber: PhoneNumber;
    avatar?: string;
    applicationUserId: string;
    passportNumber?: string;
}

export interface PatientDetailsSchema {
  isLoading: boolean;
  error?: string;
  data?: Patient;
}
export interface CountPatientsSchema {
    count?: number;
    error?: string;
    isLoading: boolean;
}
export interface AgePatientsWithCount {
    count: number;
    age: number;
}
export interface CountPatientsByAgeSchema {
    value?: AgePatientsWithCount[];
    isLoading: boolean;
    error?: string;
}