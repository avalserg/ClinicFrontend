// proection on DB
export type Appointment = {
    id?: string;
    patientId?: string;
    doctorId?: string;
    prescriptionId?: string;
    medicalCardId?: string;
    descriptionEpicrisis?: string;
    descriptionAnamnesis?: string;
    doctorFirstName?: string;
    doctorLastName?: string;
    doctorPatronymic?: string;
    speciality?: string;
    patientFirstName?: string;
    patientLastName?: string;
    patientPatronymic?: string;
    hasPrescription?: boolean;
    issuingTime?: Date;
};
export interface CountAppointmentsSchema {
    count?: number;
    error?: string;
    isLoading: boolean;
}
