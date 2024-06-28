import { StateSchema } from '@/App/Providers/StoreProvider';

export const getPatientTicketsPageIsLoading = (state: StateSchema) =>
    state.patientTicketsPage?.isLoading || false;
export const getPatientTicketsPageError = (state: StateSchema) =>
    state.patientTicketsPage?.error;
export const getPatientTicketsPageData = (state: StateSchema) =>
    state.patientTicketsPage?.data || undefined;
export const getAppointmentEpicrisis = (state: StateSchema) =>
    state.appointmentSchema?.descriptionEpicrisis;
export const getAppointmentAnamnesis = (state: StateSchema) =>
    state.appointmentSchema?.descriptionAnamnesis;

export const getPrescriptionMedicineName = (state: StateSchema) =>
    state.prescriptionSchema?.medicineName;
export const getPrescriptionReleaseForm = (state: StateSchema) =>
    state.prescriptionSchema?.releaseForm;
export const getPrescriptionAmount = (state: StateSchema) =>
    state.prescriptionSchema?.amount;
