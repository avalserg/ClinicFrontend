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

import { Doctor } from '@/Entities/Doctor';
import { isUserAdmin, isUserPatient } from '@/Entities/ApplicationUser';
import { Button } from '@/Shared/UI/Button';

import { DoctorCategory } from '@/Entities/DoctorCategory';
import { Modal } from '@/Shared/UI/Modal';
import { HStack, VStack } from '@/Shared/UI/Stack';
import { Text } from '@/Shared/UI/Text';
import { Input } from '@/Shared/UI/Input';
import { Listbox } from '@/Shared/UI/Popups';
import {
    patientTicketDetailsActions,
    patientTicketDetailsReducer,
} from '@/Entities/PatientTicket/Model/slice/patientTicketDetailsSlice';
import { getPatientTicketDate } from '@/Entities/PatientTicket/Model/selectors/getPatientTicketDate/getPatientTicketDate';
import { fetchBusyTimeForPatientTicketsByDate } from '@/Pages/DoctorPage/Model/services/fetchBusyTimeForPatientTicketsByDate';
import { fetchDoctorsList } from '../../Model/services/fetchDoctorsList';
import { getDoctorPageData } from '../../Model/selectors/doctorPageSelectors';
import { doctorPageReducer } from '../../Model/slices/doctorPageSlice';
import { updateDoctorData } from '../../Model/services/updateDoctor';
import { removeDoctor } from '../../Model/services/removeDoctor';
import { createPatientTicket } from '@/Entities/PatientTicket/Model/services/createPatientTicket';
import { hours, minutes } from '../../Model/consts/consts';

interface DoctorPageTableInfoProps {
    className?: string;
    onChange?: (value: string) => void;
}

const reducers: ReducersList = {
    doctorPage: doctorPageReducer,
    patienTicketDetails: patientTicketDetailsReducer,
};

export const DoctorPageTableInfo = memo((props: DoctorPageTableInfoProps) => {
    const { className, onChange } = props;
    const { t } = useTranslation('');
    // modal warn
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isShowBusyTimeAppointment, setIsShowBusyTimeAppointment] =
        useState(false);
    const [isPatientTicketOrderModalOpen, setIsPatientTicketOrderModalOpen] =
        useState(false);
    const [
        isSuccessCreatePatientTicketModalOpen,
        setIsSuccessCreatePatientTicketModalOpen,
    ] = useState(false);
    // modal patientTicket
    const [doctorId, setDoctorId] = useState('');
    const [doctorFirstName, setDoctorFirstName] = useState('');
    const [doctorLastName, setDoctorLastName] = useState('');
    const [doctorPatronymic, setDoctorPatronymic] = useState('');
    const [doctorSpeciality, setDoctorSpeciality] = useState('');
    const [doctorCabinetNumber, setDoctorCabinetNumber] = useState('');
    const [doctorCategory, setDoctorCategory] = useState('');

    // Listbox
    const [hoursAppointment, setHoursAppointment] = useState('');
    const [minutesAppointment, setMinutesAppointment] = useState('');

    const dispatch = useAppDispatch();
    // selectors
    const doctorPageData = useSelector(getDoctorPageData);
    const ticketOrderDate = useSelector(getPatientTicketDate);
    const isAdmin = useSelector(isUserAdmin);
    const isPatient = useSelector(isUserPatient);
    // const patientTicketData = useSelector(getPatientTicketDetailsData);
    const [errorCreatePatientTicket, setErrorCreatePatientTicket] =
        useState('');
    useEffect(() => {
        dispatch(fetchDoctorsList());
    }, [dispatch]);

    const onUpdateDoctor = useCallback(
        async (doctor: Doctor) => {
            await dispatch(updateDoctorData(doctor));
            await dispatch(fetchDoctorsList());
        },
        [dispatch],
    );

    const onCloseModal = useCallback(() => {
        setIsDeleteModalOpen(false);
    }, []);
    const onClosePatientTicketOrderModal = useCallback(() => {
        setIsPatientTicketOrderModalOpen(false);
        setHoursAppointment('');
        setMinutesAppointment('');
        setIsShowBusyTimeAppointment(false);
        setErrorCreatePatientTicket('');
        setIsSuccessCreatePatientTicketModalOpen(false);

        dispatch(patientTicketDetailsActions.setPatientTicketDate(undefined));
    }, [dispatch]);

    const onDelete = useCallback(async () => {
        await dispatch(removeDoctor(doctorId));
        await dispatch(fetchDoctorsList());
        setIsDeleteModalOpen(false);
    }, [dispatch, doctorId]);

    const onCreatePatientTicket = useCallback(async () => {
        dispatch(
            patientTicketDetailsActions.setPatientTicketDoctorId(doctorId),
        );
        const result = await dispatch(createPatientTicket());
        if (result.meta.requestStatus === 'fulfilled') {
            setIsPatientTicketOrderModalOpen(false);
            // open modal success
            setIsSuccessCreatePatientTicketModalOpen(true);

            setTimeout(() => {
                // close modal success
                onClosePatientTicketOrderModal();
            }, 1500);

            await dispatch(fetchDoctorsList());
        }
        setErrorCreatePatientTicket('Некорректное время приема');
    }, [dispatch, doctorId, onClosePatientTicketOrderModal]);

    const onShowModal = useCallback((id: string) => {
        setIsDeleteModalOpen(true);
        setDoctorId(id);
    }, []);
    const onShowPatientTicketOrderModal = useCallback(
        (
            id: string,
            firstName: string,
            lastname: string,
            patronymic: string,
            speciality: string,
            cabinetNumber: string,
            category: string,
        ) => {
            // dispatch(patientTicketDetailsActions.setPatientTicketDoctorId(id));
            setIsPatientTicketOrderModalOpen(true);
            setDoctorId(id);
            setDoctorFirstName(firstName);
            setDoctorLastName(lastname);
            setDoctorPatronymic(patronymic);
            setDoctorSpeciality(speciality);
            setDoctorCategory(category);
            setDoctorCabinetNumber(cabinetNumber);
        },
        [],
    );

    const categoryArray = Object.values(DoctorCategory);
    // eslint-disable-next-line camelcase
    const columns = useMemo<MRT_ColumnDef<Doctor>[]>(
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
                accessorFn: (row) => row?.category,
                header: 'Категория',
                editVariant: 'select',
                accessorKey: 'category',
                editSelectOptions: categoryArray,
            },
            {
                accessorFn: (row) => row?.cabinetNumber,
                header: 'Номер кабинета',
                accessorKey: 'cabinetNumber',
            },
            {
                accessorFn: (row) => row?.experience,
                header: 'Опыт работы',
                accessorKey: 'experience',
            },
            {
                accessorFn: (row) => row?.speciality,
                header: 'Специальность',
                accessorKey: 'speciality',
            },
            {
                accessorFn: (row) => row?.dateBirthday,
                header: 'День рождения',
                accessorKey: 'dateBirthday',

                Cell: ({ renderedCellValue }) =>
                    renderedCellValue?.toLocaleString().split('T')[0],
            },
            {
                accessorFn: (row) => row?.phoneNumber.value,
                header: 'Телефона',
                accessorKey: 'phoneNumber',
            },
        ],
        [categoryArray],
    );
    // const handleExportRows = (rows: MRT_Row<Doctor>[]) => {
    //     // eslint-disable-next-line new-cap
    //     const doc = new jsPDF();
    //     const tableData = rows.map((row) => Object.values(row.original));
    //     const tableHeaders = columns.map((c) => c.header);

    //     autoTable(doc, {
    //         head: [tableHeaders],
    //         body: tableData,
    //     });

    //     doc.save('mrt-pdf-example.pdf');
    // };
    // eslint-disable-next-line camelcase

    const onChangeHoursHandler = useCallback(
        (value: string) => {
            onChange?.(value);
            setHoursAppointment(value);
            dispatch(patientTicketDetailsActions.setPatientTicketHours(value));
        },
        [dispatch, onChange],
    );
    const onChangeDateHandler = useCallback(
        (value: string) => {
            dispatch(patientTicketDetailsActions.setPatientTicketDate(value));
        },
        [dispatch],
    );
    const onChangeMinutesHandler = useCallback(
        (value: string) => {
            onChange?.(value);
            setMinutesAppointment(value);
            dispatch(
                patientTicketDetailsActions.setPatientTicketMinutes(value),
            );
        },
        [onChange, dispatch],
    );
    const [busyTime, setBusyTime] = useState<string[]>();
    const onShowBusyTimeAppointment = useCallback(async () => {
        setIsShowBusyTimeAppointment(!isShowBusyTimeAppointment);
        const busyTimes = await dispatch(
            fetchBusyTimeForPatientTicketsByDate({
                doctorId,
                dateAppointment: ticketOrderDate,
            }),
        );
        // @ts-ignore
        setBusyTime(busyTimes.payload);
    }, [dispatch, doctorId, isShowBusyTimeAppointment, ticketOrderDate]);

    const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.type = 'date';
    };

    const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value) {
            event.target.type = 'text';
        }
    };

    const today = new Date().toISOString().split('T')[0];
    return (
        <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
            {doctorPageData?.items && (
                <>
                    <Modal
                        onClose={onCloseModal}
                        isOpen={isSuccessCreatePatientTicketModalOpen}
                        lazy
                    >
                        <Text title="Талон добавлен" variant={'success'} />
                    </Modal>

                    {isDeleteModalOpen && (
                        <Modal
                            onClose={onCloseModal}
                            isOpen={isDeleteModalOpen}
                            lazy
                        >
                            <VStack gap={'16'} align="center">
                                <Text
                                    title={`Удалить доктора?`}
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
                    {isPatientTicketOrderModalOpen && (
                        <Modal
                            onClose={onClosePatientTicketOrderModal}
                            isOpen={isPatientTicketOrderModalOpen}
                            lazy
                        >
                            <VStack gap={'16'} align="center">
                                <Text
                                    title={`Данные о талоне`}
                                    variant={'success'}
                                />
                                <HStack gap={'8'}>
                                    <Text text={`Фамилия :`} />
                                    <Text
                                        variant="accent"
                                        text={`${doctorLastName}`}
                                    />
                                </HStack>
                                <HStack gap={'8'}>
                                    <Text text={`Имя :`} />
                                    <Text
                                        variant="accent"
                                        text={`${doctorFirstName}`}
                                    />
                                </HStack>
                                <HStack gap={'8'}>
                                    <Text text={`Отчество :`} />
                                    <Text
                                        variant="accent"
                                        text={`${doctorPatronymic}`}
                                    />
                                </HStack>
                                <HStack gap={'8'}>
                                    <Text text={`Специальность :`} />
                                    <Text
                                        variant="accent"
                                        text={`${doctorSpeciality}`}
                                    />
                                </HStack>
                                <HStack gap={'8'}>
                                    <Text text={`Категория :`} />
                                    <Text
                                        variant="accent"
                                        text={`${doctorCategory}`}
                                    />
                                </HStack>
                                <HStack gap={'8'}>
                                    <Text text={`Номер кабинета :`} />
                                    <Text
                                        variant="accent"
                                        text={`${doctorCabinetNumber}`}
                                    />
                                </HStack>
                                {errorCreatePatientTicket !== '' && (
                                    <Text
                                        title={errorCreatePatientTicket}
                                        variant={'error'}
                                        align="center"
                                    />
                                )}
                                <VStack gap={'16'} align="center">
                                    <Input
                                        label="Дата приема"
                                        type={'text'}
                                        min={today}
                                        onKeyDown={() => false}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        placeholder="Выберите дату приема"
                                        onChange={onChangeDateHandler}
                                    />
                                    <HStack gap={'16'}>
                                        <Listbox
                                            onChange={onChangeHoursHandler}
                                            direction={'top right'}
                                            label="Час приема"
                                            items={hours}
                                            value={hoursAppointment}
                                        />
                                        <Listbox
                                            onChange={onChangeMinutesHandler}
                                            direction={'top right'}
                                            label="Минуты приема"
                                            items={minutes}
                                            value={minutesAppointment}
                                        />
                                    </HStack>
                                    {isShowBusyTimeAppointment && (
                                        <>
                                            <Text
                                                variant={'error'}
                                                text={`Занятое время для приема на ${ticketOrderDate}`}
                                            />
                                            {busyTime?.map((e) => {
                                                return (
                                                    <Text
                                                        text={e}
                                                        variant="error"
                                                    />
                                                );
                                            })}
                                        </>
                                    )}
                                    <Button
                                        color={'update'}
                                        onClick={onShowBusyTimeAppointment}
                                        disabled={ticketOrderDate === ''}
                                    >
                                        {t(' Занятое время для приема')}
                                    </Button>
                                    <Button
                                        color={'success'}
                                        onClick={onCreatePatientTicket}
                                    >
                                        {t('Оформить талон')}
                                    </Button>

                                    <Button
                                        color={'error'}
                                        onClick={onClosePatientTicketOrderModal}
                                    >
                                        {t('Отменить оформление')}
                                    </Button>
                                </VStack>
                            </VStack>
                        </Modal>
                    )}
                    <MaterialReactTable
                        columns={columns}
                        data={doctorPageData.items}
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
                            onUpdateDoctor(values);
                        }}
                        renderRowActions={({ row, table }) =>
                            isAdmin ? (
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
                            ) : (
                                isPatient && (
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
                                                title="Взять талон"
                                                onClick={() => {
                                                    onShowPatientTicketOrderModal(
                                                        row.original.id,
                                                        row.original.firstName,
                                                        row.original.lastName,
                                                        row.original.patronymic,
                                                        row.original.speciality,
                                                        row.original
                                                            .cabinetNumber,
                                                        row.original.category,
                                                    );
                                                }}
                                            >
                                                Взять талон
                                            </Button>
                                        </Box>
                                    </>
                                )
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
