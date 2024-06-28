/* eslint-disable react/display-name */
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import cls from './AdminPanelStatisticsDiagrams.module.scss';
import { classNames } from '@/Shared/lib/classNames/classNames';
import { Card } from '@/Shared/UI/Card';
import { HStack, VStack } from '@/Shared/UI/Stack';
import { Text } from '@/Shared/UI/Text';
import { useInitialEffect } from '@/Shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchCountDoctorsByCategory } from '@/Entities/Doctor/Model/services/fetchCountDoctorsByCategory';
import { useAppDispatch } from '@/Shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getCountDoctorsByCategoryData } from '@/Entities/Doctor/Model/selectors/getCountDoctorsByCategoryData/getCountDoctorsByCategoryData';
import { countDoctorByCategoryReducer } from '@/Entities/Doctor/Model/slice/doctorsCountByCategorySlice';
import DynamicModuleLoader, {
    ReducersList,
} from '@/Shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { countPatientsByAgeReducer } from '@/Entities/Patient/Model/slice/coutnPatientsByAgeSlice';
import { fetchCountPatientsByAge } from '@/Entities/Patient/Model/services/fetchCountPatientsByAge';
import { getCountPatientsByAge } from '@/Entities/Patient/Model/selectors/getCountPatientsByAge/getCountPatientsByAge';
import { fetchCountPatientTicketsOnTimePerDay } from '@/Entities/PatientTicket/Model/services/fetchCountPatientTicketsOnTimePerDay';
import { getCountPatientTicketsData } from '@/Entities/PatientTicket/Model/selectors/getCountPatientTicketData/getCountPatientTicketData';
import { getCountPatientTicketsOnTimePerDay } from '@/Entities/PatientTicket/Model/selectors/getCountPatientTicketsOnTimePerDay/getCountPatientTicketsOnTimePerDay';
import { countPatientTicketsOnTimePerDayReducer } from '@/Entities/PatientTicket/Model/slice/countPatientTicketsOnTimePerDaySlice';
import { fetchCountPatientTicketsOnMonthPerYear } from '@/Entities/PatientTicket/Model/services/fetchCountPatientTicketsOnMonthPerYear';
import { countPatientTicketsOnMonthPerYearReducer } from '@/Entities/PatientTicket/Model/slice/countPatientTicketsOnMonthPerYearSlice';
import { getCountPatientTicketsOnMonthPerYear } from '@/Entities/PatientTicket/Model/selectors/getCountPatientTicketsOnMonthPerYear/getCountPatientTicketsOnMonthPerYear';

interface AdminPanelStatisticsDiagramsProps {
    className?: string;
}
const reducers: ReducersList = {
    countDoctorsByCategory: countDoctorByCategoryReducer,
    countPatientsByAge: countPatientsByAgeReducer,
    countPatientTicketsOnTimePerDay: countPatientTicketsOnTimePerDayReducer,
    countPatientTicketsOnMonthPerYear: countPatientTicketsOnMonthPerYearReducer,
};
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const AdminPanelStatisticsDiagrams = memo(
    (props: AdminPanelStatisticsDiagramsProps) => {
        const { className } = props;
        const { t } = useTranslation('');
        const countDoctorsByCategory = useSelector(
            getCountDoctorsByCategoryData,
        );
        const countPatientsByAge = useSelector(getCountPatientsByAge);
        const countPatientTicketsOnTimePerDay = useSelector(
            getCountPatientTicketsOnTimePerDay,
        );
        const countPatientTicketsOnMonthPerYear = useSelector(
            getCountPatientTicketsOnMonthPerYear,
        );
        const dispatch = useAppDispatch();
        useEffect(() => {
            dispatch(fetchCountDoctorsByCategory());
            dispatch(fetchCountPatientsByAge());
            dispatch(fetchCountPatientTicketsOnTimePerDay());
            dispatch(fetchCountPatientTicketsOnMonthPerYear());
        }, [dispatch]);

        const highCategoryCount = countDoctorsByCategory
            ?.find((x) => x.category === 'Высшая')
            ?.count.toString();
        const firstCategoryCount = countDoctorsByCategory
            ?.find((x) => x.category === 'Первая')
            ?.count.toString();
        const secondCategoryCount = countDoctorsByCategory
            ?.find((x) => x.category === 'Вторая')
            ?.count.toString();

        const patientAgeUpTo20Years = countPatientsByAge?.reduce(
            (sum, current) => {
                if (current.age <= 20) {
                    return sum + current.count;
                }
                return sum;
            },
            0,
        );
        const patientAgeFrom20To60Years = countPatientsByAge?.reduce(
            (sum, current) => {
                if (current.age > 20 && current.age <= 60) {
                    return sum + current.count;
                }
                return sum;
            },
            0,
        );
        const patientAgeOver60Years = countPatientsByAge?.reduce(
            (sum, current) => {
                if (current.age > 60) {
                    return sum + current.count;
                }
                return sum;
            },
            0,
        );

        const ticketsUpTo12Hours = countPatientTicketsOnTimePerDay?.reduce(
            (sum, current) => {
                if (current.hoursAppointment <= 12) {
                    return sum + current.count;
                }
                return sum;
            },
            0,
        );

        const ticketsOver12Hours = countPatientTicketsOnTimePerDay?.reduce(
            (sum, current) => {
                if (current.hoursAppointment > 12) {
                    return sum + current.count;
                }
                return sum;
            },
            0,
        );

        const countTicketsForJanuary = countPatientTicketsOnMonthPerYear
            ?.find((x) => x.monthsAppointment === 1)
            ?.count.toString();
        // const countTicketsForJanuary =
        //     countPatientTicketsOnMonthPerYear?.reduce((sum, current) => {
        //         if (current.monthsAppointment === 1) {
        //             return sum + current.count;
        //         }
        //         return sum;
        //     }, 0);
        const countTicketsForFebruary = countPatientTicketsOnMonthPerYear
            ?.find((x) => x.monthsAppointment === 2)
            ?.count.toString();
        const countTicketsForMarch = countPatientTicketsOnMonthPerYear
            ?.find((x) => x.monthsAppointment === 3)
            ?.count.toString();
        const countTicketsForApril = countPatientTicketsOnMonthPerYear
            ?.find((x) => x.monthsAppointment === 4)
            ?.count.toString();
        const countTicketsForMay = countPatientTicketsOnMonthPerYear
            ?.find((x) => x.monthsAppointment === 5)
            ?.count.toString();
        const countTicketsForJune = countPatientTicketsOnMonthPerYear
            ?.find((x) => x.monthsAppointment === 6)
            ?.count.toString();
        const countTicketsForJuly = countPatientTicketsOnMonthPerYear
            ?.find((x) => x.monthsAppointment === 7)
            ?.count.toString();
        const countTicketsForAugust = countPatientTicketsOnMonthPerYear
            ?.find((x) => x.monthsAppointment === 8)
            ?.count.toString();
        const countTicketsForSeptember = countPatientTicketsOnMonthPerYear
            ?.find((x) => x.monthsAppointment === 9)
            ?.count.toString();
        const countTicketsForOctober = countPatientTicketsOnMonthPerYear
            ?.find((x) => x.monthsAppointment === 10)
            ?.count.toString();
        const countTicketsForNovember = countPatientTicketsOnMonthPerYear
            ?.find((x) => x.monthsAppointment === 11)
            ?.count.toString();
        const countTicketsForDecember = countPatientTicketsOnMonthPerYear
            ?.find((x) => x.monthsAppointment === 12)
            ?.count.toString();

        const ticketsByMonthData = {
            // eslint-disable-next-line max-len
            labels: [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь',
            ],

            datasets: [
                {
                    // eslint-disable-next-line max-len
                    labels: [
                        'Январь',
                        'Февраль',
                        'Март',
                        'Апрель',
                        'Май',
                        'Июнь',
                        'Июль',
                        'Август',
                        'Сентябрь',
                        'Октябрь',
                        'Ноябрь',
                        'Декабрь',
                    ],
                    data: [
                        countTicketsForJanuary,
                        countTicketsForFebruary,
                        countTicketsForMarch,
                        countTicketsForApril,
                        countTicketsForMay,
                        countTicketsForJune,
                        countTicketsForJuly,
                        countTicketsForAugust,
                        countTicketsForSeptember,
                        countTicketsForOctober,
                        countTicketsForNovember,
                        countTicketsForDecember,
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 2,
                },
            ],
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Количество талонов на прием по месяцам',
                    },
                },
            },
        };

        const ticketsData = {
            labels: ['Талоны до 12 часов', 'Талоны после 12 часов'],

            datasets: [
                {
                    labels: ['Талоны до 12 часов', 'Талоны после 12 часов'],
                    data: [ticketsUpTo12Hours, ticketsOver12Hours],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 2,
                },
            ],
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Количество талонов в течении дня',
                    },
                },
            },
        };

        const patientsData = {
            labels: ['до 20 лет', 'от 20 до 60 лет', 'старше 60 лет'],

            datasets: [
                {
                    labels: ['до 20 лет', 'от 20 до 60 лет', 'старше 60 лет'],
                    data: [
                        patientAgeUpTo20Years,
                        patientAgeFrom20To60Years,
                        patientAgeOver60Years,
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 2,
                },
            ],
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Градация пациентов по возрасту',
                    },
                },
            },
        };
        const doctorsData = countDoctorsByCategory
            ? {
                  labels: ['Высшая', 'Первая', 'Вторая'],

                  datasets: [
                      {
                          labels: ['Высшая', 'Первая', 'Вторая'],
                          data: [
                              highCategoryCount,
                              firstCategoryCount,
                              secondCategoryCount,
                          ],
                          backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(255, 206, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',
                              'rgba(153, 102, 255, 0.2)',
                              'rgba(255, 159, 64, 0.2)',
                          ],
                          borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)',
                          ],
                          borderWidth: 2,
                      },
                  ],
                  options: {
                      responsive: true,
                      plugins: {
                          title: {
                              display: true,
                              text: 'Градация врачей по категориям',
                          },
                      },
                  },
              }
            : undefined;

        return (
            <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
                <div
                    className={classNames(
                        cls.AdminPanelStatisticsDiagrams,
                        {},
                        [className],
                    )}
                >
                    {doctorsData && (
                        <>
                            <HStack wrap="wrap" gap="16" max align={'center'}>
                                <Card
                                    className={classNames(
                                        cls.cardContent,
                                        {},
                                        [],
                                    )}
                                    variant={'light'}
                                    padding={'24'}
                                    max
                                >
                                    <div>
                                        <Pie
                                            options={doctorsData.options}
                                            data={doctorsData}
                                        />
                                    </div>
                                </Card>
                                <Card
                                    className={classNames(
                                        cls.cardContent,
                                        {},
                                        [],
                                    )}
                                    variant={'light'}
                                    padding={'24'}
                                    max
                                >
                                    <Pie
                                        options={ticketsData.options}
                                        data={ticketsData}
                                    />
                                </Card>

                                <Card
                                    className={classNames(
                                        cls.cardContent,
                                        {},
                                        [],
                                    )}
                                    variant={'light'}
                                    padding={'24'}
                                    max
                                >
                                    <Pie
                                        options={patientsData.options}
                                        data={patientsData}
                                    />
                                </Card>
                                <Card
                                    className={classNames(
                                        cls.cardContent,
                                        {},
                                        [],
                                    )}
                                    variant={'light'}
                                    padding={'24'}
                                    max
                                >
                                    <Pie
                                        options={ticketsByMonthData.options}
                                        data={ticketsByMonthData}
                                    />
                                </Card>
                            </HStack>
                        </>
                    )}
                </div>
            </DynamicModuleLoader>
        );
    },
);
