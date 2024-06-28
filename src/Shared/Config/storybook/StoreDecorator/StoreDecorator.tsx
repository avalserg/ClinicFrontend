/* eslint-disable avalserg-plugin/public-api-imports */
// TODO testing
import { type Decorator } from '@storybook/react';
import { type StateSchema, StoreProvider } from '@/App/Providers/StoreProvider';
import { articleDetailsReducer } from '@/Entities/Article/testing';
import { loginReducer } from '@/Features/AuthByUserName/testing';
import { addCommentFormReducer } from '@/Features/addCommentForm/testing';
import { profileReducer } from '@/Features/editableProfileCard/testing';
import { ReducersList } from '@/Shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsPageReducer } from '@/Pages/ArticleDetailsPage/testing';
import { registerPatientReducer } from '@/Features/RegisterPatientForm';
import { doctorProfileReducer } from '@/Features/editableProfileCard/Model/slice/doctorProfileSlice';
import { adminProfileReducer } from '@/Features/editableProfileCard/Model/slice/adminProfileSlice';
import { reviewsPageReducer } from '@/Pages/ReviewsPage/Model/slices/reviewsPageSlice';
import { createReviewReducer } from '@/Pages/ReviewsPage/Model/slices/createReviewSlice';
import { patientTicketDetailsReducer } from '@/Entities/PatientTicket/Model/slice/patientTicketDetailsSlice';
import { patientTicketsPageReducer } from '@/Pages/PatientTicketPage/Model/slices/patientTicketsPageSlice';
import { createAppointmentReducer } from '@/Pages/PatientTicketPage/Model/slices/createAppointmentSlice';
import { createPrescriptionReducer } from '@/Pages/PatientTicketPage/Model/slices/createPrescriptionSlice';
import { countDoctorByCategoryReducer } from '@/Entities/Doctor/Model/slice/doctorsCountByCategorySlice';

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    review: createReviewReducer,
    doctorProfile: doctorProfileReducer,
    adminProfile: adminProfileReducer,
    registerPatientSchema: registerPatientReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articleDetailsPage: articleDetailsPageReducer,
    reviewsPage: reviewsPageReducer,
    patientTicketsPage: patientTicketsPageReducer,
    // for create Appointment
    appointmentSchema: createAppointmentReducer,
    // for create Prescription
    prescriptionSchema: createPrescriptionReducer,
    countDoctorsByCategory: countDoctorByCategoryReducer,
    
};
export const StoreDecorator =
    (
        state: DeepPartial<StateSchema>,
        asyncReducers?: ReducersList,
    ): Decorator =>
    (Story) => (
        <StoreProvider
            initialState={state}
            asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
        >
            <Story />
        </StoreProvider>
    );
