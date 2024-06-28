import { DoctorProfile } from '../../../Model/types/profile';

import {
    DoctorInfoProfileCard,
    DoctorProfileCardSkeleton,
} from '../DoctorInfoProfileCard/DoctorInfoProfileCard';
import { DoctorCategory } from '@/Entities/DoctorCategory';

export interface DoctorProfileCardProps {
    className?: string;
    data?: DoctorProfile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeFirstName?: (value?: string) => void;
    onChangeLastName?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeAddress?: (value?: string) => void;
    onChangePhoneNumber?: (phonenumber?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeDateBirthday?: (value?: string) => void;
    onChangePatronymic?: (value?: string) => void;
    onChangePhoto?: (value?: string) => void;
    onChangeCategory?: (category: DoctorCategory) => void;
    onChangeExperience?: (experience: string) => void;
    onChangeCabinetNumber?: (value: string) => void;
}

export const DoctorProfileCard = (props: DoctorProfileCardProps) => {
    const { isLoading, error } = props;
    if (isLoading) {
        return <DoctorProfileCardSkeleton />;
    }
    // if (error) {
    //     return <DoctorProfileCardError />;
    // }

    return <DoctorInfoProfileCard {...props} />;
};
