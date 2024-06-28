import { PatientTicketSchema} from './patientTicket';

export interface PatientTicketsDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: PatientTicketSchema;
}
