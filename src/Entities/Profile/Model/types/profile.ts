import { Country } from '@/Entities/Country';
import { Currency } from '@/Entities/Currency';
import { DoctorCategory } from '@/Entities/DoctorCategory';

interface ProfilePhoneNumber {
    value: string;
}

export interface Profile {
    applicationUserId?: string;
    first?: string;
    last?: string;
    age?: number;
    currency?: Currency;
    country?: Country;
    city?: string;
    username?: string;
    photo?: string;
    address?: string;
    firstName?: string;
    lastName?: string;
    patronymic?: string;
    phoneNumber?: ProfilePhoneNumber;
    login?: string;
    avatar?: string;
    dateBirthday?: string;
}
export interface PatientProfile {
    applicationUserId?: string;
    address?: string;
    firstName?: string;
    lastName?: string;
    patronymic?: string;
    phoneNumber?: ProfilePhoneNumber;
    passportNumber?: string;
    login?: string;
    avatar?: string;
    dateBirthday?: string;
}
export interface DoctorProfile {
    applicationUserId?: string;
    address?: string;
    firstName?: string;
    lastName?: string;
    patronymic?: string;
    phoneNumber?: ProfilePhoneNumber;
    login?: string;
    photo?: string;
    dateBirthday?: string;
    cabinetNumber?: string;
    experience?: string;
    category?: DoctorCategory;
}
export interface AdminProfile {
    applicationUserId?: string;
    firstName?: string;
    lastName?: string;
    patronymic?: string;
}
