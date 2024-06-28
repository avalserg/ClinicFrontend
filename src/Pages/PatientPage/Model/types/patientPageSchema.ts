import { Patient } from "@/Entities/Patient";


interface PatientListData {
    items: Patient[];
    totalCount: number;
}

export interface PatientsPageSchema {
    isLoading?: boolean;
    error?: string;
    data?: PatientListData;
}
