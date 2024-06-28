/* eslint-disable camelcase */
/* eslint-disable import/order */
/* eslint-disable react/display-name */
import { memo, useCallback, useMemo, useState } from 'react';
import { DateTime } from 'luxon';

import { useTranslation } from 'react-i18next';
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import { PatientTicket } from '@/Entities/PatientTicket';
import DynamicModuleLoader, {
    ReducersList,
} from '@/Shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { patientTicketsPageReducer } from '../../Model/slices/patientTicketsPageSlice';
import {
    fetchAllPatientTicketsList,
    fetchPatientTicketsListByDoctorId,
    fetchPatientTicketsListByPatientId,
} from '../../Model/services/fetchPatientTicketsList';
import { useInitialEffect } from '@/Shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/Shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    isUserAdmin,
    isUserDoctor,
    isUserPatient,
} from '@/Entities/ApplicationUser';
import { useSelector } from 'react-redux';
import {
    getAppointmentAnamnesis,
    getAppointmentEpicrisis,
    getPatientTicketsPageData,
    getPatientTicketsPageIsLoading,
    getPrescriptionAmount,
    getPrescriptionMedicineName,
    getPrescriptionReleaseForm,
} from '../../Model/selectors/patientTicketsPageSelectors';
import { Box } from '@mui/material';
import { Button } from '@/Shared/UI/Button';
import { Modal } from '@/Shared/UI/Modal';
import { HStack, VStack } from '@/Shared/UI/Stack';
import { Text } from '@/Shared/UI/Text';
import { removePatientTicket } from '../../Model/services/removePatientTicket';
import { TextArea } from '@/Shared/UI/TextArea';
import {
    createAppointmentActions,
    createAppointmentReducer,
} from '../../Model/slices/createAppointmentSlice';
import { createAppointment } from '../../Model/services/createAppointment';
import { Input } from '@/Shared/UI/Input';
import {
    createPrescriptionActions,
    createPrescriptionReducer,
} from '../../Model/slices/createPrescriptionSlice';
import { createPrescription } from '../../Model/services/createPrescription';
import { changePatientTicketIsVisited } from '../../Model/services/changePatientTicketIsVisited';

interface PatientTicketPageTableInfoProps {
    className?: string;
}
const reducers: ReducersList = {
    patientTicketsPage: patientTicketsPageReducer,
    appointmentSchema: createAppointmentReducer,
    prescriptionSchema: createPrescriptionReducer,
};
export const PatientTicketsPageTableInfo = memo(
    (props: PatientTicketPageTableInfoProps) => {
        const { className } = props;
        const { t } = useTranslation('');
        const dispatch = useAppDispatch();
        const isAdmin = useSelector(isUserAdmin);
        const isPatient = useSelector(isUserPatient);
        const isDoctor = useSelector(isUserDoctor);
        const isLoading = useSelector(getPatientTicketsPageIsLoading);
        const patientTicketsData = useSelector(getPatientTicketsPageData);
        const descriptionEpicrisis = useSelector(getAppointmentEpicrisis);
        const descriptionAnamnesis = useSelector(getAppointmentAnamnesis);
        // prescription selectors
        const medicineName = useSelector(getPrescriptionMedicineName);
        const releaseForm = useSelector(getPrescriptionReleaseForm);
        const amountPrescription = useSelector(getPrescriptionAmount);
        useInitialEffect(() => {
            if (isPatient) {
                dispatch(fetchPatientTicketsListByPatientId());
            }
            if (isAdmin) {
                dispatch(fetchAllPatientTicketsList());
            }
            if (isDoctor) {
                dispatch(fetchPatientTicketsListByDoctorId());
            }
        });
        // eslint-disable-next-line camelcase
        const columns = useMemo<MRT_ColumnDef<PatientTicket>[]>(
            () => [
                {
                    accessorFn: (row) => row?.id,
                    header: 'N талона',
                    accessorKey: 'id',
                    size: 50,
                },

                {
                    accessorFn: (row) =>
                        row?.dateAppointment
                            ?.toString()
                            .split('.')[0]
                            .replace('T', ' '),
                    header: 'Время посещения',
                    accessorKey: 'dateAppointment',
                    size: 150,
                },

                {
                    accessorFn: (row) => row?.doctorLastName,
                    header: 'Фамилия врача',
                    accessorKey: 'doctorLastName',
                    size: 150,
                },
                {
                    accessorFn: (row) => row?.doctorFirstName,
                    header: 'Имя врача',
                    accessorKey: 'doctorFirstName',
                    size: 150,
                },

                {
                    accessorFn: (row) => row?.doctorPatronymic,
                    header: 'Отчество врача',
                    accessorKey: 'doctorPatronymic',
                    size: 150,
                },
                {
                    accessorFn: (row) => row?.doctorSpeciality,
                    header: 'Специальнось',
                    accessorKey: 'doctorSpeciality',
                    size: 150,
                },
                {
                    accessorFn: (row) => row?.cabinetNumber,
                    header: 'N кабинета',
                    accessorKey: 'cabinetNumber',
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
        const [
            isSuccessAppointmentCreateText,
            setIsSuccessAppointmentCreateText,
        ] = useState(false);
        const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
        const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] =
            useState(false);
        const [isEnterAppointmentModalOpen, setIsEnterAppointmentModalOpen] =
            useState(false);
        const [patientTicketId, setPatientTicketId] = useState('');
        const [patientId, setPatientId] = useState('');
        const onCloseModal = useCallback(() => {
            setIsDeleteModalOpen(false);
            setIsEnterAppointmentModalOpen(false);
            setIsSuccessAppointmentCreateText(false);
            setIsPrescriptionModalOpen(false);
        }, []);
        const onDelete = useCallback(async () => {
            await dispatch(removePatientTicket(patientTicketId));
            if (isPatient) {
                await dispatch(fetchPatientTicketsListByPatientId());
            }
            if (isAdmin) {
                await dispatch(fetchAllPatientTicketsList());
            }
            if (isDoctor) {
                await dispatch(fetchPatientTicketsListByDoctorId());
            }

            setIsDeleteModalOpen(false);
        }, [dispatch, isAdmin, isDoctor, isPatient, patientTicketId]);
        const onShowModal = useCallback((id: string) => {
            setIsDeleteModalOpen(true);
            setPatientTicketId(id);
        }, []);
        // for doctor enter data about appointment by patient Ticket
        const onShowEnterAppointmentModal = useCallback(
            (patientId: string, patientTicketId: string) => {
                setIsEnterAppointmentModalOpen(true);
                setPatientId(patientId);
                setPatientTicketId(patientTicketId);
            },
            [],
        );
        const onChangeAnamnesis = useCallback(
            (value: string) => {
                dispatch(
                    createAppointmentActions.setAppointmentAnamnesis(value),
                );
            },
            [dispatch],
        );
        const onChangeEpicrisis = useCallback(
            (value: string) => {
                dispatch(
                    createAppointmentActions.setAppointmentEpicrisis(value),
                );
            },
            [dispatch],
        );
        const onChangeMedicineName = useCallback(
            (value: string) => {
                dispatch(
                    createPrescriptionActions.setPrescriptionMedicineName(
                        value,
                    ),
                );
            },
            [dispatch],
        );
        const onChangeReleaseForm = useCallback(
            (value: string) => {
                dispatch(
                    createPrescriptionActions.setPrescriptionReleaseForm(value),
                );
            },
            [dispatch],
        );
        const onChangeAmount = useCallback(
            (value: string) => {
                dispatch(
                    createPrescriptionActions.setPrescriptionAmount(value),
                );
            },
            [dispatch],
        );

        const onAppointmentCreate = useCallback(async () => {
            const result = await dispatch(createAppointment(patientId));
            if (result.meta.requestStatus === 'fulfilled') {
                // make PatientTicket as visited
                const updatedIsVisit = await dispatch(
                    changePatientTicketIsVisited(patientTicketId),
                );
                if (updatedIsVisit.meta.requestStatus === 'fulfilled') {
                    dispatch(fetchPatientTicketsListByDoctorId());
                    setIsSuccessAppointmentCreateText(true);
                }
            }
        }, [dispatch, patientId, patientTicketId]);
        const onPrescriptionCreate = useCallback(async () => {
            const result = await dispatch(createPrescription(patientId));
            if (result.meta.requestStatus === 'fulfilled') {
                dispatch(fetchPatientTicketsListByDoctorId());
                setIsPrescriptionModalOpen(false);
            }
        }, [dispatch, patientId]);
        const onPrescriptionCreateModal = useCallback(async () => {
            setIsPrescriptionModalOpen(true);
            setIsSuccessAppointmentCreateText(false);
            setIsEnterAppointmentModalOpen(false);
        }, []);
        return (
            <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
                {patientTicketsData?.items && (
                    <>
                        {isDeleteModalOpen && (
                            <>
                                <Modal
                                    onClose={onCloseModal}
                                    isOpen={isDeleteModalOpen}
                                    lazy
                                >
                                    <VStack gap={'16'} align="center">
                                        <Text
                                            title={`Отменить талон?`}
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

                        {isPrescriptionModalOpen && (
                            <>
                                <Modal
                                    onClose={onCloseModal}
                                    isOpen={isPrescriptionModalOpen}
                                    lazy
                                >
                                    <VStack gap={'16'} align="center">
                                        <Text
                                            title={`Данные рецепта`}
                                            variant={'error'}
                                        />

                                        <Input
                                            label="Наименование лекарства"
                                            placeholder={
                                                'Введите название лекарства'
                                            }
                                            onChange={onChangeMedicineName}
                                            value={medicineName}
                                        />
                                        <Input
                                            label="Форма выпуска"
                                            placeholder={
                                                'Введите форму выпуска лекарства'
                                            }
                                            onChange={onChangeReleaseForm}
                                            value={releaseForm}
                                        />
                                        <Input
                                            label="Количество"
                                            placeholder={'Введите количество'}
                                            onChange={onChangeAmount}
                                            value={amountPrescription}
                                        />
                                        <HStack gap="8">
                                            <Button
                                                color="success"
                                                onClick={onPrescriptionCreate}
                                            >
                                                {t('Выписать')}
                                            </Button>
                                            <Button
                                                color={'error'}
                                                onClick={onCloseModal}
                                            >
                                                {t('Отменить')}
                                            </Button>
                                        </HStack>
                                    </VStack>
                                </Modal>
                            </>
                        )}

                        {isEnterAppointmentModalOpen && (
                            <>
                                <Modal
                                    onClose={onCloseModal}
                                    isOpen={isEnterAppointmentModalOpen}
                                    lazy
                                >
                                    {isSuccessAppointmentCreateText ? (
                                        <>
                                            <VStack gap="16" justify="end" max>
                                                <Text
                                                    align="center"
                                                    title={
                                                        'Данные приема сохранены'
                                                    }
                                                />
                                                <HStack
                                                    gap={'8'}
                                                    justify="center"
                                                    max
                                                >
                                                    <Button
                                                        color="success"
                                                        onClick={
                                                            onPrescriptionCreateModal
                                                        }
                                                    >
                                                        {t('Выписать рецепт')}
                                                    </Button>
                                                    <Button
                                                        color={'error'}
                                                        onClick={onCloseModal}
                                                    >
                                                        {t('Без рецепта')}
                                                    </Button>
                                                </HStack>
                                            </VStack>
                                        </>
                                    ) : (
                                        <>
                                            <VStack gap={'8'} max>
                                                <Text text="Эпикриз" size="l" />
                                                <TextArea
                                                    autoFocus
                                                    placeholder={t(
                                                        'Введите содержание эпикриза не менее 10 символов',
                                                    )}
                                                    onChange={onChangeEpicrisis}
                                                    value={descriptionEpicrisis}
                                                />
                                                <Text text="Анамнез" size="l" />
                                                <TextArea
                                                    placeholder={t(
                                                        'Введите содержание анамнеза не менее 10 символов',
                                                    )}
                                                    onChange={onChangeAnamnesis}
                                                    value={descriptionAnamnesis}
                                                />
                                            </VStack>
                                            <HStack gap="8" justify="end">
                                                <Button
                                                    color="success"
                                                    onClick={
                                                        onAppointmentCreate
                                                    }
                                                    // className={cls.loginBtn}
                                                    // disabled={
                                                    //     reviewIsLoading
                                                    //     // reviewDescription!.length < 3
                                                    // }
                                                >
                                                    {t('Подтвердить')}
                                                </Button>
                                                <Button
                                                    color={'error'}
                                                    onClick={onCloseModal}
                                                >
                                                    {t('Отменить')}
                                                </Button>
                                            </HStack>
                                        </>
                                    )}
                                </Modal>
                            </>
                        )}

                        <MaterialReactTable
                            columns={columns}
                            data={
                                isAdmin
                                    ? patientTicketsData.items
                                    : patientTicketsData.items.filter(
                                          (p) =>
                                              p.hasDoctorVisit === false &&
                                              p.dateAppointment! >
                                                  DateTime.now().toString(),
                                      )
                            }
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
                                columnVisibility: {
                                    patientId: !!isAdmin,
                                },
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
                                                {!row.original.hasDoctorVisit &&
                                                row.original.dateAppointment! >
                                                    DateTime.now().toString() ? (
                                                    <Button
                                                        color="error"
                                                        title="Удалить"
                                                        onClick={() => {
                                                            onShowModal(
                                                                row.original.id,
                                                            );
                                                        }}
                                                    >
                                                        {t('Отменить талон')}
                                                    </Button>
                                                ) : (
                                                    <>
                                                        {row.original
                                                            .hasDoctorVisit ? (
                                                            <Text
                                                                text="Посещался"
                                                                variant={
                                                                    'success'
                                                                }
                                                            />
                                                        ) : (
                                                            <Text
                                                                text="Не посещался"
                                                                variant={
                                                                    'error'
                                                                }
                                                            />
                                                        )}
                                                    </>
                                                )}
                                            </Box>
                                        </>
                                    );
                                }
                                if (isPatient) {
                                    return (
                                        <>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexWrap: 'nowrap',
                                                    gap: '8px',
                                                }}
                                            >
                                                {!row.original
                                                    .hasDoctorVisit && (
                                                    <Button
                                                        color="error"
                                                        title="Удалить"
                                                        onClick={() => {
                                                            onShowModal(
                                                                row.original.id,
                                                            );
                                                        }}
                                                    >
                                                        {t('Отменить талон')}
                                                    </Button>
                                                )}
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
                                                {!row.original
                                                    .hasDoctorVisit && (
                                                    <>
                                                        <Button
                                                            color="success"
                                                            title="Ввести данные приема"
                                                            onClick={() => {
                                                                onShowEnterAppointmentModal(
                                                                    row.original
                                                                        .patientId,
                                                                    row.original
                                                                        .id,
                                                                );
                                                            }}
                                                        >
                                                            {t(
                                                                'Ввести данные приема',
                                                            )}
                                                        </Button>
                                                    </>
                                                )}
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
            </DynamicModuleLoader>
        );
    },
);
