/* eslint-disable react/display-name */
import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './MedicalCardPageTableInfo.module.scss';
import {
    MRT_ColumnDef,
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';

import DynamicModuleLoader, {
    ReducersList,
} from '@/Shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { useInitialEffect } from '@/Shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/Shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    isUserAdmin,
    isUserDoctor,
    isUserPatient,
} from '@/Entities/ApplicationUser';
import { useSelector } from 'react-redux';

import { Box } from '@mui/material';
import { Button } from '@/Shared/UI/Button';
import { Modal } from '@/Shared/UI/Modal';
import { HStack, VStack } from '@/Shared/UI/Stack';
import { Text } from '@/Shared/UI/Text';
import { medicalCardsPageReducer } from '../../Model/slices/medicalCardsPageSlice';
import {
    getMedicalCardsPageData,
    getMedicalCardsPageIsLoading,
} from '../../Model/selectors/medicalCardPageSelectors';
import { fetchAllMedicalCardsList } from '../../Model/services/fetchMedicalCardsList';
import { MedicalCard } from '@/Entities/MedicalCard/Model/types/medicalCard';
import { removeMedicalCard } from '../../Model/services/removeMedicalCard';
import { fetchAppointmentsListByPatientId } from '@/Pages/AppointmentsPage/Model/services/fetchAppointmentsList';
import { getAppointmentsPageData } from '@/Pages/AppointmentsPage/Model/selectors/appointmentsPageSelectors';
import { appointmentsPageReducer } from '@/Pages/AppointmentsPage/Model/slices/appointmentsPageSlice';
import { Appointment } from '@/Entities/Appointment/Model/types/appointment';
import { fetchPrescriptionById } from '@/Entities/Prescription/Model/services/fetchPrescriptionById';
import { getPrescriptionByIdData } from '@/Entities/Prescription/Model/selectors/getPrescriptionByIdData/getPrescriptionByIdData';
import { prescriptionsReducer } from '@/Entities/Prescription/Model/slice/prescriptionByIdSlice';

interface MedicalCardPageTableInfoProps {
    className?: string;
}
const reducers: ReducersList = {
    medicalCardsPage: medicalCardsPageReducer,
    appointmentsPage: appointmentsPageReducer,
    prescription: prescriptionsReducer,
};
export const MedicalCardsPageTableInfo = memo(
    (props: MedicalCardPageTableInfoProps) => {
        const { className } = props;
        const { t } = useTranslation('');
        const dispatch = useAppDispatch();
        const isAdmin = useSelector(isUserAdmin);
        const isPatient = useSelector(isUserPatient);
        const isDoctor = useSelector(isUserDoctor);
        const isLoading = useSelector(getMedicalCardsPageIsLoading);
        const medicalCardsData = useSelector(getMedicalCardsPageData);
        const prescriptionData = useSelector(getPrescriptionByIdData);
        useInitialEffect(() => {
            if (isAdmin || isDoctor) {
                dispatch(fetchAllMedicalCardsList());
            }
        });
        // eslint-disable-next-line camelcase
        const columns = useMemo<MRT_ColumnDef<MedicalCard>[]>(
            () => [
                {
                    accessorFn: (row) => row?.id,
                    header: 'N талона',
                    accessorKey: 'id',
                    size: 50,
                },

                {
                    accessorFn: (row) => row?.firstName,
                    header: 'Имя',
                    accessorKey: 'firstName',
                    size: 150,
                },

                {
                    accessorFn: (row) => row?.lastName,
                    header: 'Фамилия',
                    accessorKey: 'lastName',
                    size: 150,
                },
                {
                    accessorFn: (row) => row?.patronymic,
                    header: 'Отчество',
                    accessorKey: 'patronymic',
                    size: 150,
                },

                {
                    accessorFn: (row) => row?.dateBirthday,
                    header: 'Дата рождения',
                    accessorKey: 'dateBirthday',
                    size: 150,
                },
                {
                    accessorFn: (row) => row?.address,
                    header: 'Адрес',
                    accessorKey: 'address',
                    size: 150,
                },
                {
                    accessorFn: (row) => row?.phoneNumber,
                    header: 'Номер телефона',
                    accessorKey: 'phoneNumber',
                    size: 150,
                },
                {
                    accessorFn: (row) => row?.patientId,
                    header: 'Id пациента',
                    accessorKey: 'patientId',
                    size: 150,
                },
            ],
            [],
        );
        const columnsAppointments = useMemo<MRT_ColumnDef<Appointment>[]>(
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
                    accessorFn: (row) => row?.patientLastName,
                    accessorKey: 'patientLastName',
                    header: 'Фамилия врача',
                    size: 150,
                },
                {
                    accessorFn: (row) => row?.patientFirstName,
                    accessorKey: 'patientFirstName',
                    header: 'Имя врача',
                    size: 150,
                },
                {
                    accessorFn: (row) => row?.patientPatronymic,
                    accessorKey: 'patientPatronymic',
                    header: 'Отчество врача',
                    size: 150,
                },
                {
                    accessorFn: (row) =>
                        row.hasPrescription && row?.prescriptionId,
                    accessorKey: 'prescriptionId', // access nested data with dot notation
                    header: 'Id рецепта',
                    size: 50,
                },
            ],
            [],
        );
        const [isShowAppointments, setIsShowAppointments] = useState(false);
        const [isShowPrescriptionModal, setIsShowPrescriptionModal] =
            useState(false);
        const appointmentsByMedicalCard = useSelector(getAppointmentsPageData);
        const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
        const [medicalCardId, setMedicalCardId] = useState('');
        const onCloseModal = useCallback(() => {
            setIsDeleteModalOpen(false);
            setIsShowPrescriptionModal(false);
        }, []);
        const onDelete = useCallback(async () => {
            await dispatch(removeMedicalCard(medicalCardId));
            if (isAdmin || isDoctor) {
                await dispatch(fetchAllMedicalCardsList());
            }

            setIsDeleteModalOpen(false);
        }, [dispatch, isAdmin, isDoctor, medicalCardId]);
        const onShowModal = useCallback((id: string) => {
            setIsDeleteModalOpen(true);
            setMedicalCardId(id);
        }, []);

        const onShowAppointments = useCallback(
            async (id: string | undefined) => {
                if (id) {
                    await dispatch(fetchAppointmentsListByPatientId(id));
                    setIsShowAppointments(true);
                }
            },
            [dispatch],
        );
        const onCloseAppointments = useCallback(() => {
            setIsShowAppointments(false);
        }, []);

        const onShowPrescription = useCallback(
            async (prescriptionId: string | undefined) => {
                setIsShowPrescriptionModal(true);
                dispatch(fetchPrescriptionById(prescriptionId));
            },
            [dispatch],
        );
        return (
            <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
                {isShowAppointments ? (
                    <>
                        <Modal
                            onClose={onCloseModal}
                            isOpen={isShowPrescriptionModal}
                            lazy
                        >
                            <VStack gap={'16'} align="center">
                                <Text
                                    title={`Данные о рецепте`}
                                    variant={'success'}
                                />
                                <HStack gap={'8'}>
                                    <Text title={`Фамилия врача:`} />
                                    <Text
                                        variant={'accent'}
                                        title={`${prescriptionData?.doctorLastName}`}
                                    />
                                </HStack>
                                <HStack gap={'8'}>
                                    <Text title={`Имя врача:`} />
                                    <Text
                                        variant={'accent'}
                                        title={`${prescriptionData?.doctorFirstName}`}
                                    />
                                </HStack>
                                <HStack gap={'8'}>
                                    <Text title={`Отчество врача:`} />
                                    <Text
                                        variant={'accent'}
                                        title={`${prescriptionData?.doctorPatronymic}`}
                                    />
                                </HStack>
                                <HStack gap={'8'}>
                                    <Text title={`Дата выдачи:`} />
                                    <Text
                                        variant={'accent'}
                                        title={`${prescriptionData?.issuingTime?.toString().split('.')[0]}`}
                                    />
                                </HStack>
                                <HStack gap={'8'}>
                                    <Text title={`Наименование лекарства:`} />
                                    <Text
                                        variant={'accent'}
                                        title={`${prescriptionData?.medicineName}`}
                                    />
                                </HStack>
                                <HStack gap={'8'}>
                                    <Text title={`Количество:`} />
                                    <Text
                                        variant={'accent'}
                                        title={`${prescriptionData?.amount}`}
                                    />
                                </HStack>
                            </VStack>
                        </Modal>
                        <VStack gap={'8'} max align={'center'}>
                            <Text
                                align="center"
                                variant="error"
                                title={t('Записи в карте')}
                            />
                            <VStack gap={'8'} max align={'start'}>
                                <Button
                                    color={'normal'}
                                    onClick={onCloseAppointments}
                                    className={cls.buttonBottomMargin}
                                >
                                    {t('Вернуться к списку карт')}
                                </Button>
                            </VStack>
                        </VStack>
                        {appointmentsByMedicalCard?.items && (
                            <>
                                <MaterialReactTable
                                    columns={columnsAppointments}
                                    data={appointmentsByMedicalCard.items}
                                    // enableColumnFilterModes
                                    enableColumnOrdering
                                    // enableEditing
                                    enableColumnPinning
                                    enableRowActions
                                    positionActionsColumn="last"
                                    // enableRowSelection
                                    enableSelectAll={false}
                                    initialState={{
                                        showColumnFilters: true,
                                        showGlobalFilter: true,
                                        // columnVisibility: {
                                        //     patientId: !!isAdmin,
                                        // },
                                    }}
                                    renderRowActions={({ row, table }) => {
                                        return (
                                            <>
                                                {row.original
                                                    .hasPrescription ? (
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexWrap: 'nowrap',
                                                            gap: '8px',
                                                        }}
                                                    >
                                                        <Button
                                                            color={'success'}
                                                            title="Посмотреть рецепт"
                                                            onClick={() => {
                                                                onShowPrescription(
                                                                    row.original
                                                                        .prescriptionId,
                                                                );
                                                            }}
                                                        >
                                                            {t(
                                                                'Посмотреть рецепт',
                                                            )}
                                                        </Button>
                                                    </Box>
                                                ) : (
                                                    <>
                                                        <Text
                                                            text={'Без рецепта'}
                                                        />
                                                    </>
                                                )}
                                            </>
                                        );
                                    }}
                                />
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {medicalCardsData?.items && (
                            <>
                                <Text
                                    align="center"
                                    variant="error"
                                    title={t('Медицинские карты')}
                                />
                                {isDeleteModalOpen && (
                                    <>
                                        <Modal
                                            onClose={onCloseModal}
                                            isOpen={isDeleteModalOpen}
                                            lazy
                                        >
                                            <VStack gap={'16'} align="center">
                                                <Text
                                                    title={`Отправить карту в архив?`}
                                                    variant={'error'}
                                                />
                                                <HStack gap="8">
                                                    <Button
                                                        color={'error'}
                                                        onClick={onDelete}
                                                    >
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
                                    </>
                                )}
                                <MaterialReactTable
                                    columns={columns}
                                    data={medicalCardsData.items}
                                    // enableColumnFilterModes
                                    enableColumnOrdering
                                    // enableEditing
                                    enableColumnPinning
                                    enableRowActions
                                    positionActionsColumn="last"
                                    // enableRowSelection
                                    enableSelectAll={false}
                                    initialState={{
                                        showColumnFilters: true,
                                        showGlobalFilter: true,
                                        // columnVisibility: {
                                        //     patientId: !!isAdmin,
                                        // },
                                    }}
                                    renderRowActions={({ row, table }) => {
                                        if (isAdmin) {
                                            return (
                                                <>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexWrap: 'nowrap',
                                                            gap: '8px',
                                                        }}
                                                    >
                                                        <Button
                                                            color={'success'}
                                                            title="Посмотреть записи"
                                                            onClick={() => {
                                                                onShowAppointments(
                                                                    row.original
                                                                        .patientId,
                                                                );
                                                            }}
                                                        >
                                                            {t(
                                                                'Посмотреть записи',
                                                            )}
                                                        </Button>

                                                        {/* <Button
                                                            color="error"
                                                            title="Удалить"
                                                            onClick={() => {
                                                                onShowModal(
                                                                    row.original
                                                                        .id,
                                                                );
                                                            }}
                                                        >
                                                            {t(
                                                                'Отправить в архив',
                                                            )}
                                                        </Button> */}
                                                    </Box>
                                                </>
                                            );
                                        }

                                        if (isDoctor) {
                                            return (
                                                <>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexWrap: 'nowrap',
                                                            gap: '8px',
                                                        }}
                                                    >
                                                        <Button
                                                            color={'success'}
                                                            title="Посмотреть записи"
                                                            onClick={() => {
                                                                onShowAppointments(
                                                                    row.original
                                                                        .patientId,
                                                                );
                                                            }}
                                                        >
                                                            {t(
                                                                'Посмотреть записи',
                                                            )}
                                                        </Button>
                                                    </Box>
                                                </>
                                            );
                                        }
                                        return <></>;
                                    }}
                                    // eslint-disable-next-line camelcase
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
