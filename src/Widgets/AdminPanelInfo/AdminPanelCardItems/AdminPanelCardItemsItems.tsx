/* eslint-disable react/display-name */
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCountPrescriptionsData } from '@/Entities/Prescription/Model/selectors/getCountPrescriptionsData/getCountPrescriptionsData';
import cls from './AdminPanelCardItems.module.scss';
import { classNames } from '@/Shared/lib/classNames/classNames';
import { HStack } from '@/Shared/UI/Stack';
import { Card } from '@/Shared/UI/Card';
import { Icon } from '@/Shared/UI/Icon';
import DoctorIcon from '@/Shared/Assets/Icons/doctor.svg';
import HospitalIcon from '@/Shared/Assets/Icons/hospital.svg';
import ReceptionIcon from '@/Shared/Assets/Icons/reception.svg';
import PatientTicketIcon from '@/Shared/Assets/Icons/medical_card.svg';
import PrescriptionIcon from '@/Shared/Assets/Icons/medicine.svg';

import { Text } from '@/Shared/UI/Text';
import { useAppDispatch } from '@/Shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchCountDoctors } from '@/Entities/Doctor/Model/services/fetchCountDoctors';
import { useInitialEffect } from '@/Shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { getCountDoctorData } from '@/Entities/Doctor/Model/selectors/getCountDoctorData/getCountDoctorData';
import DynamicModuleLoader, {
    ReducersList,
} from '@/Shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { countDoctorReducer } from '@/Entities/Doctor/Model/slice/doctorCountSlice';
import { fetchCountPatients } from '@/Entities/Patient/Model/services/fetchCountPatients';
import { patientsCountReducer } from '@/Entities/Patient/Model/slice/patientsCountSlice';
import { getCountPatientsData } from '@/Entities/Patient/Model/selectors/getCountPatientsData/getCountPatientsData';
import { patientTicketsCountReducer } from '@/Entities/PatientTicket/Model/slice/patientTicketsCountSlice';
import { fetchCountPatientTickets } from '@/Entities/PatientTicket/Model/services/fetchCountPatientTickets';
import { getCountPatientTicketsData } from '@/Entities/PatientTicket/Model/selectors/getCountPatientTicketData/getCountPatientTicketData';
import { getCountAppointmentsData } from '@/Entities/Appointment/Model/selectors/getCountAppointmentsData/getCountAppointmentsData';
import { fetchCountAppointments } from '@/Entities/Appointment/Model/services/fetchCountAppointments';
import { appointmentsCountReducer } from '@/Entities/Appointment/Model/slice/appointmentsCountSlice';
import { prescriptionsCountReducer } from '@/Entities/Prescription/Model/slice/prescriptionsCountSlice';
import { fetchCountPrescriptions } from '@/Entities/Prescription/Model/services/fetchCountPrescriptions';
import { countDoctorByCategoryReducer } from '@/Entities/Doctor/Model/slice/doctorsCountByCategorySlice';

interface MainPageInfoCardsItemsProps {
    className?: string;
}
const reducers: ReducersList = {
    countDoctors: countDoctorReducer,
    countPatients: patientsCountReducer,
    countPatientTickets: patientTicketsCountReducer,
    countAppointments: appointmentsCountReducer,
    countPrescriptions: prescriptionsCountReducer,
    countDoctorsByCategory: countDoctorByCategoryReducer,
};

export const AdminPanelCardItems = memo(
    (props: MainPageInfoCardsItemsProps) => {
        const { className } = props;
        const { t } = useTranslation('statistics');
        const dispatch = useAppDispatch();

        const countDoctors = useSelector(getCountDoctorData);
        const countPatients = useSelector(getCountPatientsData);
        const countPatientTickets = useSelector(getCountPatientTicketsData);
        const countAppointments = useSelector(getCountAppointmentsData);
        const countPrescriptions = useSelector(getCountPrescriptionsData);
        useInitialEffect(() => {
            dispatch(fetchCountDoctors());
            dispatch(fetchCountPatients());
            dispatch(fetchCountPatientTickets());
            dispatch(fetchCountAppointments());
            dispatch(fetchCountPrescriptions());
        });

        return (
            <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
                <Text
                    className={classNames(cls.title)}
                    title="Статистика"
                    align={'center'}
                />
                <HStack
                    wrap="wrap"
                    gap={'8'}
                    className={classNames(cls.MainPageInfoCardsItems, {}, [])}
                    max
                >
                    <Card
                        className={classNames(cls.cardContent, {}, [])}
                        max
                        variant={'outlined'}
                        padding={'24'}
                        border={'partialRound'}
                    >
                        <Icon Svg={DoctorIcon} />
                        {/* <Text align={"center"} title="16" variant="error" size="l"/> */}
                        <Text
                            align={'center'}
                            title={t('{{count}} штатный врач', {
                                count: countDoctors,
                            })}
                            variant="error"
                            size="m"
                        />
                    </Card>
                    <Card
                        className={classNames(cls.cardContent, {}, [])}
                        max
                        variant={'outlined'}
                        padding={'24'}
                        border={'partialRound'}
                    >
                        <Icon Svg={ReceptionIcon} />

                        <Text
                            align={'center'}
                            title={t('{{count}} пациент', {
                                count: countPatients,
                            })}
                            variant="error"
                            size="m"
                        />
                    </Card>
                    <Card
                        className={classNames(cls.cardContent, {}, [])}
                        max
                        variant={'outlined'}
                        padding={'24'}
                        border={'partialRound'}
                    >
                        <Icon Svg={PatientTicketIcon} />

                        <Text
                            align={'center'}
                            title={t('{{count}} талон на прием', {
                                count: countPatientTickets,
                            })}
                            variant="error"
                            size="m"
                        />
                    </Card>
                    <Card
                        className={classNames(cls.cardContent, {}, [])}
                        max
                        variant={'outlined'}
                        padding={'24'}
                        border={'partialRound'}
                    >
                        <Icon Svg={HospitalIcon} />
                        <Text
                            align={'center'}
                            title={t('{{count}} прием', {
                                count: countAppointments,
                            })}
                            variant="error"
                            size="m"
                        />
                    </Card>
                    <Card
                        className={classNames(cls.cardContent, {}, [])}
                        max
                        variant={'outlined'}
                        padding={'24'}
                        border={'partialRound'}
                    >
                        <Icon Svg={PrescriptionIcon} />
                        <Text
                            align={'center'}
                            title={t('{{count}} рецепт', {
                                count: countPrescriptions,
                            })}
                            variant="error"
                            size="m"
                        />
                    </Card>
                </HStack>
            </DynamicModuleLoader>
        );
    },
);
