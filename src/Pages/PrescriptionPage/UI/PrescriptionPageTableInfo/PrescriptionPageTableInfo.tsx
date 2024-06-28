/* eslint-disable camelcase */
/* eslint-disable react/display-name */
import { memo, useMemo } from 'react';
import cls from './PrescriptionPageTableInfo.module.scss';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/Shared/lib/classNames/classNames';
import DynamicModuleLoader, {
    ReducersList,
} from '@/Shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import { Prescription } from '@/Entities/Prescription/Model/types/prescription';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import { useInitialEffect } from '@/Shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import {
    isUserAdmin,
    isUserDoctor,
    isUserPatient,
} from '@/Entities/ApplicationUser';
import { prescriptionsPageReducer } from '../../Model/slice/prescriptionPageSlice';
import {
    getPrescriptionsPageData,
    getPrescriptionsPageIsLoading,
} from '../../Model/selectors/prescriptionsPageSelectors';
import {
    fetchAllPrescriptionsList,
    fetchPrescriptionsListByDoctorId,
    fetchPrescriptionsListByPatientId,
} from '../../Model/services/fetchPrescriptionsList';
import { StateSchema } from '@/App/Providers/StoreProvider';
import { ThunkExtraArg } from '@/App/Providers/StoreProvider/Config/StateSchema';
import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/Shared/lib/hooks/useAppDispatch/useAppDispatch';

interface PrescriptionPageTableInfoProps {
    className?: string;
}
const reducers: ReducersList = {
    prescriptionsPage: prescriptionsPageReducer,
};
export const PrescriptionPageTableInfo = memo(
    (props: PrescriptionPageTableInfoProps) => {
        const { className } = props;
        const { t } = useTranslation('');
        const isAdmin = useSelector(isUserAdmin);
        const isDoctor = useSelector(isUserDoctor);
        const isPatient = useSelector(isUserPatient);
        const dispatch = useAppDispatch();
        const prescriptionsData = useSelector(getPrescriptionsPageData);
        const isLoading = useSelector(getPrescriptionsPageIsLoading);
        useInitialEffect(() => {
            if (isAdmin) {
                dispatch(fetchAllPrescriptionsList());
            }
            if (isDoctor) {
                dispatch(fetchPrescriptionsListByDoctorId());
            }
            if (isPatient) {
                dispatch(fetchPrescriptionsListByPatientId());
            }
        });
        const columns = useMemo<MRT_ColumnDef<Prescription>[]>(
            () => [
                {
                    accessorFn: (row) => row?.id,
                    accessorKey: 'id', // access nested data with dot notation
                    header: 'Id рецепта',
                    size: 50,
                },
                {
                    accessorFn: (row) => row?.medicineName,
                    accessorKey: 'medicineName',
                    header: 'Название лекарства',
                    size: 150,
                },
                {
                    accessorFn: (row) => row?.releaseForm,
                    accessorKey: 'releaseForm', // normal accessorKey
                    header: 'Форма выпуска',
                    size: 200,
                },
                {
                    accessorFn: (row) => row?.amount,
                    accessorKey: 'amount',
                    header: 'Количество',
                    size: 150,
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
                    accessorFn: (row) =>
                        row?.issuingTime
                            ?.toString()
                            .split('.')[0]
                            .replace('T', ' '),
                    accessorKey: 'issuingTime',
                    header: 'Дата выдачи',
                    size: 150,
                },
                {
                    accessorFn: (row) => row?.appointmentId,
                    accessorKey: 'appointmentId',
                    header: 'N приема',
                    size: 150,
                },
            ],
            [],
        );
        return (
            <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
                {!isLoading && (
                    <>
                        {prescriptionsData?.items && (
                            <>
                                <MaterialReactTable
                                    columns={columns}
                                    data={prescriptionsData.items}
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
                                        columnVisibility: {
                                            id: !!isAdmin,
                                            doctorId: !!isAdmin,
                                            appointmentId: !!isAdmin,
                                        },
                                    }}
                                    localization={MRT_Localization_RU}
                                />
                            </>
                        )}
                    </>
                )}
            </DynamicModuleLoader>
        );
    },
);
