import {
    type ReducersMapObject,
    type EnhancedStore,
    type Reducer,
    type CombinedState,
    type AnyAction,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from '@/Entities/Article';
import { type LoginSchema } from '@/Features/AuthByUserName';
import { UISchema } from '@/Features/UI';
import { AddCommentFormSchema } from '@/Features/addCommentForm';
import {
    AdminProfileSchema,
    DoctorProfileSchema,
    PatientProfileSchema,
    ProfileSchema,
} from '@/Features/editableProfileCard';

import { ArticleDetailsPageSchema } from '@/Pages/ArticleDetailsPage';
import { ArticlesPageSchema } from '@/Pages/ArticlesPage';
import { rtkApi } from '@/Shared/API/rtkApi';
import { ApplicationUserSchema } from '@/Entities/ApplicationUser';
import { DoctorDetailsSchema } from '@/Entities/Doctor';
import { PatientDetailsSchema } from '@/Entities/Patient';

import { RegisterPatientSchema } from '@/Features/RegisterPatientForm';
import { AdminDetailsSchema } from '@/Entities/Admin';
import { ReviewDetailsSchema, ReviewSchema } from '@/Entities/Review';

import { ReviewsPageSchema } from '@/Pages/ReviewsPage/Model/types/reviewsPageSchema';
import { DoctorsPageSchema } from '@/Pages/DoctorPage/Model/types/doctorPageSchema';
import { RegisterDoctorSchema } from '@/Features/RegisterDoctorForm/Model/types/registerDoctorSchema';
import { PatientTicketsDetailsSchema } from '@/Entities/PatientTicket/Model/types/patientTicketDetailsSchema';
import {
    CountPatientTicketsOnMonthPerYearSchema,
    CountPatientTicketsOnTimePerDaySchema,
    CountPatientTicketsSchema,
    PatientTicketSchema,
} from '@/Entities/PatientTicket/Model/types/patientTicket';
import { CategoryDoctorsWithCount, CountDoctorsByCategorySchema, CountDoctorsSchema } from '@/Entities/Doctor/Model/types/doctor';
import {
    CreateAppointmentSchema,
    CreatePrescriptionSchema,
    PatientTicketsPageSchema,
} from '@/Pages/PatientTicketPage/Model/types/patientTicketPageSchema';
import { CountPatientsByAgeSchema, CountPatientsSchema } from '@/Entities/Patient/Model/types/patient';
import { MedicalCardsPageSchema } from '@/Pages/MedicalCardPage/Model/types/medicalCardsPageSchema';
import { CountAppointmentsSchema } from '@/Entities/Appointment/Model/types/appointment';
import {
    CountPrescriptionsSchema,
    Prescription,
    PrescriptionSchema,
} from '@/Entities/Prescription/Model/types/prescription';
import { PrescriptionsPageSchema } from '@/Pages/PrescriptionPage/Model/types/prescriptionsPageSchema';
import { AppointmentsPageSchema } from '@/Pages/AppointmentsPage/Model/types/appointmentPageSchema';
import { PatientsPageSchema } from '@/Pages/PatientPage/Model/types/patientPageSchema';

export interface StateSchema {
    applicationUser: ApplicationUserSchema;
    ui: UISchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    // Async Reducers separate chunk unnecesarry
    doctor?: DoctorDetailsSchema;
    doctorPage?: DoctorsPageSchema;
    registerDoctor?: RegisterDoctorSchema;
    patient?: PatientDetailsSchema;
    patientPage?: PatientsPageSchema;
    admin?: AdminDetailsSchema;
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    review?: ReviewSchema;
    // createReview?: CreateReviewSchema;
    doctorProfile?: DoctorProfileSchema;
    adminProfile?: AdminProfileSchema;
    patientProfile?: PatientProfileSchema;
    registerPatientSchema?: RegisterPatientSchema;
    articleDetails?: ArticleDetailsSchema;
    reviewDetails?: ReviewDetailsSchema;
    patienTicketDetails?: PatientTicketSchema;
    // articleDetailsComments?: ArticleDetailsCommentSchema;
    // articleDetailsRecommendations?: ArticleDetailsRecommendationsSchema;
    addCommentForm?: AddCommentFormSchema;
    articlesPage?: ArticlesPageSchema;
    reviewsPage?: ReviewsPageSchema;
    patientTicketsPage?: PatientTicketsPageSchema;
    articleDetailsPage?: ArticleDetailsPageSchema;
    countDoctors?: CountDoctorsSchema;
    countDoctorsByCategory?: CountDoctorsByCategorySchema;
    countPatients?: CountPatientsSchema;
    countPatientsByAge?: CountPatientsByAgeSchema;
    countPatientTickets?: CountPatientTicketsSchema;
    countPatientTicketsOnTimePerDay?: CountPatientTicketsOnTimePerDaySchema;
    countPatientTicketsOnMonthPerYear?:CountPatientTicketsOnMonthPerYearSchema;
    countAppointments?: CountAppointmentsSchema;
    medicalCardsPage?: MedicalCardsPageSchema;
    appointmentSchema?: CreateAppointmentSchema;
    prescriptionSchema?: CreatePrescriptionSchema;
    countPrescriptions?: CountPrescriptionsSchema;
    prescription?: PrescriptionSchema;
    prescriptionsPage?: PrescriptionsPageSchema;
    appointmentsPage?: AppointmentsPageSchema;
}
// достаем ключи для reducerManager
export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;
export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    // return state
    reduce: (
        state: StateSchema,
        action: AnyAction,
    ) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    // name reducer and is mounted? true - mounted
    // not all Reducers neccessary
    getMountedReducers: () => MountedReducers;
}
// EnhancedStore standart type for store
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}
// object for extra arg
export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    // return value getState function for example updateProfileData
    state: StateSchema;
}
