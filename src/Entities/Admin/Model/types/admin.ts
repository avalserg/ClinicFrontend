interface FullName {
  firstName: string;
  lastName: string;
  patronymic: string;
 
}


export interface Admin {  
  id: string;
  fullName: FullName;
  applicationUserId: string;
}

export interface AdminDetailsSchema {
  isLoading: boolean;
  error?: string;
  data?: Admin;
}