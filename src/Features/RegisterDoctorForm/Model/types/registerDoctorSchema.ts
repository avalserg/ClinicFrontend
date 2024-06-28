import { DoctorCategory } from '@/Entities/DoctorCategory';
import { ValidateRegisterDoctorError } from '../consts/consts';

export interface RegisterDoctorSchema {
    isLoading?: boolean;
    firstName?: string;
    lastName?: string;
    patronymic?: string;
    dateBirthday?: string;
    phoneNumber?: string;
    cabinetNumber?: string;
    speciality?: string;
    experience?: string;
    login?: string;
    password?: string;
    category?: DoctorCategory;
    address?: string;
    photo?: string;
    validateErrors?: ValidateRegisterDoctorError[];
    error?: string;
}
