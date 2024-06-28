import { Doctor } from '@/Entities/Doctor';

interface DoctorListData {
    items: Doctor[];
    totalCount: number;
}

export interface DoctorsPageSchema {
    isLoading?: boolean;
    error?: string;
    data?: DoctorListData;
}
