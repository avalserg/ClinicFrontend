export { profileReducer } from './Model/slice/profileSlice';
export { adminProfileReducer } from './Model/slice/adminProfileSlice';
export { doctorProfileReducer } from './Model/slice/doctorProfileSlice';

export type {
    ProfileSchema,
    AdminProfileSchema,
    DoctorProfileSchema,
    PatientProfileSchema,
} from './Model/types/editableProfileCardSchema';

export { EditableProfileCard } from './UI/EditableProfileCard/EditableProfileCard';
