// proection on DB
export type MedicalCard = {
    id: string;
    patientId?: string;
    doctorId?: string;
    firstName?: string;
    lastName?: string;
    patronymic?: string;
    dateBirthday?: string;
    address?: string;
    phoneNumber?: string;
};

export interface CountMedicalCardsSchema {
    count?: number;
    error?: string;
    isLoading: boolean;
}