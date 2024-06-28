/* eslint-disable camelcase */
/* eslint-disable react/display-name */
import { memo, useMemo } from 'react';
import cls from './AppointmentsPageTableInfo.module.scss';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/Shared/lib/classNames/classNames';
import DynamicModuleLoader, {
    ReducersList,
} from '@/Shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Appointment } from '@/Entities/Appointment/Model/types/appointment';
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import { useInitialEffect } from '@/Shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/Shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { isUserAdmin, isUserDoctor } from '@/Entities/ApplicationUser';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import { getAppointmentsPageData } from '../../Model/selectors/appointmentsPageSelectors';
import {
    fetchAllAppointmentsList,
    fetchAppointmentsListByDoctorId,
} from '../../Model/services/fetchAppointmentsList';
import { appointmentsPageReducer } from '../../Model/slices/appointmentsPageSlice';

interface AppointmentsPageTableInfoProps {
    className?: string;
}
const reducers: ReducersList = {
    appointmentsPage: appointmentsPageReducer,
};
export const AppointmentsPageTableInfo = memo(
    (props: AppointmentsPageTableInfoProps) => {
        const { className } = props;
        const isAdmin = useSelector(isUserAdmin);
        const isDoctor = useSelector(isUserDoctor);
        const dispatch = useAppDispatch();
        const appointmentsData = useSelector(getAppointmentsPageData);
        const { t } = useTranslation('');
        useInitialEffect(() => {
            if (isAdmin) {
                dispatch(fetchAllAppointmentsList());
            }
            if (isDoctor) {
                dispatch(fetchAppointmentsListByDoctorId());
            }
        });
        const columns = useMemo<MRT_ColumnDef<Appointment>[]>(
            () => [
                {
                    accessorFn: (row) => row?.id,
                    accessorKey: 'id', // access nested data with dot notation
                    header: 'Id приема',
                    size: 50,
                },
                {
                    accessorFn: (row) =>
                        row?.issuingTime
                            ?.toString()
                            .split('.')[0]
                            .replace('T', ' '),
                    accessorKey: 'issuingTime', // access nested data with dot notation
                    header: 'Время приема',
                    size: 50,
                },
                {
                    accessorFn: (row) => row?.descriptionEpicrisis,
                    accessorKey: 'descriptionEpicrisis', // access nested data with dot notation
                    header: 'Эпикриз',
                    size: 50,
                },
                {
                    accessorFn: (row) => row?.descriptionAnamnesis,
                    accessorKey: 'descriptionAnamnesis', // access nested data with dot notation
                    header: 'Анамнез',
                    size: 50,
                },
                {
                    accessorFn: (row) => row?.doctorId,
                    accessorKey: 'doctorId',
                    header: 'Id врача',
                    size: 150,
                },
                {
                    accessorFn: (row) => row?.doctorLastName,
                    accessorKey: 'doctorLastName',
                    header: 'Фамилия врача',
                    size: 150,
                },
                {
                    accessorFn: (row) => row?.doctorFirstName,
                    accessorKey: 'doctorFirstName',
                    header: 'Имя врача',
                    size: 150,
                },
                {
                    accessorFn: (row) => row?.doctorPatronymic,
                    accessorKey: 'doctorPatronymic',
                    header: 'Отчество врача',
                    size: 150,
                },
                {
                    accessorFn: (row) => row?.patientId,
                    accessorKey: 'patientId',
                    header: 'Id пациента',
                    size: 150,
                },
                {
                    accessorFn: (row) => row?.patientLastName,
                    accessorKey: 'patientLastName',
                    header: 'Фамилия пациента',
                    size: 150,
                },
                {
                    accessorFn: (row) => row?.patientFirstName,
                    accessorKey: 'patientFirstName',
                    header: 'Имя пациента',
                    size: 150,
                },
                {
                    accessorFn: (row) => row?.patientPatronymic,
                    accessorKey: 'patientPatronymic',
                    header: 'Отчество пациента',
                    size: 150,
                },
            ],
            [],
        );
        return (
            <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
                {appointmentsData?.items && (
                    <>
                        <MaterialReactTable
                            columns={columns}
                            data={appointmentsData.items}
                            // enableColumnFilterModes
                            enableColumnOrdering
                            // enableEditing
                            enableColumnPinning
                            // enableRowActions
                            // enableRowSelection
                            enableSelectAll={false}
                            initialState={{
                                showColumnFilters: true,
                                showGlobalFilter: true,
                            }}
                            localization={MRT_Localization_RU}
                        />
                    </>
                )}
            </DynamicModuleLoader>
        );
    },
);
