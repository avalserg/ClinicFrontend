import { Prescription } from "@/Entities/Prescription/Model/types/prescription";

interface PrescriptionssPageListData {
    items: Prescription[];
    // totalCount: number;
}

export interface PrescriptionsPageSchema {
    isLoading?: boolean;
    error?: string;
    data?: PrescriptionssPageListData;
}
