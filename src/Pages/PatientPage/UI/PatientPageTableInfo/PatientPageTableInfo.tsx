/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable i18next/no-literal-string */
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    // eslint-disable-next-line camelcase
    MRT_ColumnDef,
    MaterialReactTable,
} from 'material-react-table';
// eslint-disable-next-line camelcase
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import { useSelector } from 'react-redux';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useAppDispatch } from '@/Shared/lib/hooks/useAppDispatch/useAppDispatch';
import DynamicModuleLoader, {
    ReducersList,
} from '@/Shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { isUserAdmin, isUserPatient } from '@/Entities/ApplicationUser';
import { Button } from '@/Shared/UI/Button';

import { Modal } from '@/Shared/UI/Modal';
import { HStack, VStack } from '@/Shared/UI/Stack';
import { Text } from '@/Shared/UI/Text';

import { Patient } from '@/Entities/Patient';
import { patientPageReducer } from '../../Model/slices/patientPageSlice';
import { fetchPatientsList } from '../../Model/services/fetchPatientsList';
import { getPatientPageData } from '../../Model/selectors/patientPageSelector/patientPageSelelectors';
import { updatePatientData } from '../../Model/services/updatePatient';
import { removePatient } from '../../Model/services/removePatient';

interface PatientPageTableInfoProps {
    className?: string;
    onChange?: (value: string) => void;
}

const reducers: ReducersList = {
    patientPage: patientPageReducer,
};

export const PatientPageTableInfo = memo((props: PatientPageTableInfoProps) => {
    const { className, onChange } = props;
    const { t } = useTranslation('');
    // modal warn
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // modal patientTicket
    const [patientId, setPatientId] = useState('');

    const dispatch = useAppDispatch();
    // selectors
    const patientPageData = useSelector(getPatientPageData);

    const isAdmin = useSelector(isUserAdmin);
    const isPatient = useSelector(isUserPatient);

    useEffect(() => {
        dispatch(fetchPatientsList());
    }, [dispatch]);

    const onUpdatePatient = useCallback(
        async (patient: Patient) => {
            await dispatch(updatePatientData(patient));
            await dispatch(fetchPatientsList());
        },
        [dispatch],
    );

    const onCloseModal = useCallback(() => {
        setIsDeleteModalOpen(false);
    }, []);

    const onDelete = useCallback(async () => {
        await dispatch(removePatient(patientId));
        await dispatch(fetchPatientsList());
        setIsDeleteModalOpen(false);
    }, [dispatch, patientId]);

    const onShowModal = useCallback((id: string) => {
        setIsDeleteModalOpen(true);
        setPatientId(id);
    }, []);

    // eslint-disable-next-line camelcase
    const columns = useMemo<MRT_ColumnDef<Patient>[]>(
        () => [
            {
                accessorFn: (row) => row?.id,
                accessorKey: 'id',
                header: 'Id',
                enableEditing: false,
                enableHiding: true,
            },
            {
                accessorFn: (row) => row?.lastName,
                accessorKey: 'lastName',
                header: 'Фамилия',
            },
            {
                accessorFn: (row) => row?.firstName,
                header: 'Имя',
                accessorKey: 'firstName',
            },
            {
                accessorFn: (row) => row?.patronymic,
                header: 'Отчество',
                accessorKey: 'patronymic',
            },
            {
                accessorFn: (row) => row?.address,
                header: 'Адрес',
                accessorKey: 'address',
            },

            {
                accessorFn: (row) => row?.phoneNumber.value,
                header: 'Номер телефона',
                accessorKey: 'phoneNumber',
            },
            {
                accessorFn: (row) => row?.passportNumber,
                header: 'Номер паспорта',
                accessorKey: 'passportNumber',
            },
            {
                accessorFn: (row) => row?.dateBirthday,
                header: 'День рождения',
                accessorKey: 'dateBirthday',

                Cell: ({ renderedCellValue }) =>
                    renderedCellValue?.toLocaleString().split('T')[0],
            },
        ],
        [],
    );

    const today = new Date().toISOString().split('T')[0];
    return (
        <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
            {patientPageData?.items && (
                <>
                    {isDeleteModalOpen && (
                        <Modal
                            onClose={onCloseModal}
                            isOpen={isDeleteModalOpen}
                            lazy
                        >
                            <VStack gap={'16'} align="center">
                                <Text
                                    title={`Удалить пациента?`}
                                    variant={'error'}
                                />
                                <HStack gap="8">
                                    <Button color={'error'} onClick={onDelete}>
                                        {t('Да')}
                                    </Button>
                                    <Button
                                        color={'normal'}
                                        onClick={onCloseModal}
                                    >
                                        {t('Нет')}
                                    </Button>
                                </HStack>
                            </VStack>
                        </Modal>
                    )}

                    <MaterialReactTable
                        columns={columns}
                        data={patientPageData.items}
                        // enableColumnFilterModes
                        enableColumnOrdering
                        enableEditing
                        enableColumnPinning
                        // enableRowActions
                        // enableRowSelection
                        positionActionsColumn="last"
                        enableSelectAll={false}
                        initialState={{
                            showColumnFilters: true,
                            showGlobalFilter: true,
                            columnVisibility: {
                                id: !!isAdmin,
                                address: !!isAdmin,
                                dateBirthday: !!isAdmin,
                                phoneNumber: !!isAdmin,
                            },
                        }}
                        onEditingRowSave={({ table, values }) => {
                            onUpdatePatient(values);
                        }}
                        renderRowActions={({ row, table }) =>
                            isAdmin && (
                                <>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'nowrap',
                                            gap: '8px',
                                        }}
                                    >
                                        <Button
                                            color={'update'}
                                            title="Редактировать"
                                            onClick={() => {
                                                table.setEditingRow(row);
                                            }}
                                        >
                                            <EditIcon />
                                        </Button>
                                        <Button
                                            color="error"
                                            title="Удалить"
                                            onClick={() => {
                                                onShowModal(row.original.id);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </Box>
                                </>
                            )
                        }
                        // eslint-disable-next-line camelcase
                        localization={MRT_Localization_RU}
                    />
                </>
            )}
        </DynamicModuleLoader>
    );
});
