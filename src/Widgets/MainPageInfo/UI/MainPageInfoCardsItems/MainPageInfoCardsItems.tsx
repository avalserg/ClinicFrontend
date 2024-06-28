/* eslint-disable react/display-name */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './MainPageInfoCardsItems.module.scss';
import { classNames } from '@/Shared/lib/classNames/classNames';
import { HStack } from '@/Shared/UI/Stack';
import { Card } from '@/Shared/UI/Card';
import { Icon } from '@/Shared/UI/Icon';
import DoctorIcon from '@/Shared/Assets/Icons/doctor.svg';
import PatientIcon from '@/Shared/Assets/Icons/patient.svg';
import ReceptionIcon from '@/Shared/Assets/Icons/reception.svg';
import { Text } from '@/Shared/UI/Text';
import { useSelector } from 'react-redux';
import { getCountAppointmentsData } from '@/Entities/Appointment/Model/selectors/getCountAppointmentsData/getCountAppointmentsData';
import { fetchCountAppointments } from '@/Entities/Appointment/Model/services/fetchCountAppointments';
import { getCountDoctorData } from '@/Entities/Doctor/Model/selectors/getCountDoctorData/getCountDoctorData';
import { fetchCountDoctors } from '@/Entities/Doctor/Model/services/fetchCountDoctors';
import { getCountPatientsData } from '@/Entities/Patient/Model/selectors/getCountPatientsData/getCountPatientsData';
import { fetchCountPatients } from '@/Entities/Patient/Model/services/fetchCountPatients';
import { useInitialEffect } from '@/Shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/Shared/lib/hooks/useAppDispatch/useAppDispatch';
import DynamicModuleLoader, {
    ReducersList,
} from '@/Shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { appointmentsCountReducer } from '@/Entities/Appointment/Model/slice/appointmentsCountSlice';
import { countDoctorReducer } from '@/Entities/Doctor/Model/slice/doctorCountSlice';
import { patientsCountReducer } from '@/Entities/Patient/Model/slice/patientsCountSlice';

interface MainPageInfoCardsItemsProps {
    className?: string;
}
const reducers: ReducersList = {
    countDoctors: countDoctorReducer,
    countPatients: patientsCountReducer,

    countAppointments: appointmentsCountReducer,
};

export const MainPageInfoCardsItems = memo(
    (props: MainPageInfoCardsItemsProps) => {
        const { className } = props;
        const { t } = useTranslation('statistics');
        const countDoctors = useSelector(getCountDoctorData);
        const countPatients = useSelector(getCountPatientsData);
        const countAppointments = useSelector(getCountAppointmentsData);
        const dispatch = useAppDispatch();
        useInitialEffect(() => {
            dispatch(fetchCountDoctors());
            dispatch(fetchCountPatients());

            dispatch(fetchCountAppointments());
        });
        return (
            <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
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
                            title={
                                countAppointments
                                    ? t('{{count}} прием', {
                                          count: countAppointments,
                                      })
                                    : 'Нет приемов'
                            }
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
                        <Icon Svg={PatientIcon} />
                        <Text
                            align={'center'}
                            title={t('{{count}} пациент', {
                                count: countPatients,
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
