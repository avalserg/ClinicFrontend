import { DoctorCategory } from '@/Entities/DoctorCategory';

interface FullName {
    firstName: string;
    lastName: string;
    patronymic: string;
}
interface PhoneNumber {
    value: string;
}

export interface Doctor {
    id: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    dateBirthday: Date;
    address: string;
    phoneNumber: PhoneNumber;
    photo?: string;
    experience: number;
    cabinetNumber: string;
    category: string;
    applicationUserId: string;
    speciality: string;
}

export interface DoctorDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: Doctor;
}
export interface CountDoctorsSchema {
    countDoctors?: number;
    error?: string;
    isLoading: boolean;
}



export interface CategoryDoctorsWithCount {
    count: number,
    category : string
}
export interface CountDoctorsByCategorySchema {
    value?: CategoryDoctorsWithCount[];
    isLoading: boolean;
    error?: string;
}
