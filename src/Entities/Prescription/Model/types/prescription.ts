// proection on DB
export type Prescription = {
    id?: string;
    patientId?: string;
    doctorId?: string;
    appointmentId?: string;
    doctorFirstName?: string;
    doctorLastName?: string;
    doctorPatronymic?: string;
    patientFirstName?: string;
    patientLastName?: string;
    patientPatronymic?: string;
    medicineName?: string;
    releaseForm?: string;
    amount?: string;
    issuingTime?: Date;
};

export interface CountPrescriptionsSchema {
    count?: number;
    error?: string;
    isLoading: boolean;
}

export type PrescriptionSchema = {
    error?: string;
    isLoading?: boolean;
    data?: Prescription;
};