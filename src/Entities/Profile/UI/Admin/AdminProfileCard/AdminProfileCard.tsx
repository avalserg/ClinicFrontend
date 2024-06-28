import { AdminProfile } from '../../../Model/types/profile';
import {
    AdminInfoProfileCard,
    AdminProfileCardSkeleton,
} from '../AdminInfoProfileCard/AdminInfoProfileCard';

export interface AdminProfileCardProps {
    className?: string;
    data?: AdminProfile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeFirstName?: (value?: string) => void;
    onChangeLastName?: (value?: string) => void;
    onChangePatronymic?: (value?: string) => void;
}

export const AdminProfileCard = (props: AdminProfileCardProps) => {
    const { isLoading, error } = props;
    if (isLoading) {
        return <AdminProfileCardSkeleton />;
    }
    return <AdminInfoProfileCard {...props} />;
};
