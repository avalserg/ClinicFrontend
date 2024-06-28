
import { PatientTicket } from '@/Entities/PatientTicket';

interface PatientTicketsPageListData {
    items: PatientTicket[];
    // totalCount: number;
}

export interface PatientTicketsPageSchema {
    isLoading?: boolean;
    error?: string;
    data?: PatientTicketsPageListData;
}


export interface CreateAppointmentSchema {
    isLoading?: boolean;
    // error?: ValidateCreateAppointmentError[];
    error?: string;
    descriptionEpicrisis?: string;
    descriptionAnamnesis?: string;
}
export interface CreatePrescriptionSchema {
    isLoading?: boolean;
    error?: string;
    medicineName?: string;
    releaseForm?: string;
    amount?: string;
}