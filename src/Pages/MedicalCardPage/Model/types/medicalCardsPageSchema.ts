import { MedicalCard } from '@/Entities/MedicalCard/Model/types/medicalCard';

interface MedicalCardsPageListData {
    items: MedicalCard[];
    // totalCount: number;
}

export interface MedicalCardsPageSchema {
    isLoading?: boolean;
    error?: string;
    data?: MedicalCardsPageListData;
}
