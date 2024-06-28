// proection on DB
export type PatientTicket = {
    id: string;
    patientId: string;
    doctorId?: string;
    dateAppointment?: string;
    doctorFirstName?: string;
    doctorLastName?: string;
    doctorPatronymic?: string;
    cabinetNumber?: string;
    doctorSpeciality?: string;
    hasDoctorVisit?: boolean;
};
export type PatientTicketSchema = {
    isLoading?: boolean;
    error?: string;
    id?: string;
    patientId?: string;
    doctorId?: string;
    dateAppointment?: string;
    hoursAppointment?: string;
    minutesAppointment?: string;
};
export interface CountPatientTicketsSchema {
    count?: number;
    error?: string;
    isLoading: boolean;
}

export interface HoursPatientTicketsAppointmentWithCount {
    count: number;
    hoursAppointment: number;
}
export interface CountPatientTicketsOnTimePerDaySchema {
    value?: HoursPatientTicketsAppointmentWithCount[];
    isLoading: boolean;
    error?: string;
}
export interface MonthsPatientTicketsAppointmentWithCount {
    count: number;
    monthsAppointment: number;
}
export interface CountPatientTicketsOnMonthPerYearSchema {
    value?: MonthsPatientTicketsAppointmentWithCount[];
    isLoading: boolean;
    error?: string;
}