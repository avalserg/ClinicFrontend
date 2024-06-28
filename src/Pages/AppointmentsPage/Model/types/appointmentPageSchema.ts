
import { Appointment } from '@/Entities/Appointment/Model/types/appointment';


interface AppointmentsPageListData {
    items: Appointment[];
    // totalCount: number;
}

export interface AppointmentsPageSchema {
    isLoading?: boolean;
    error?: string;
    data?: AppointmentsPageListData;
}
