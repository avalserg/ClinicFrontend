/* eslint-disable react/display-name */
import { memo, useEffect, useState } from 'react';
import cls from './MainPageInfoDoctors.module.scss';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/Shared/lib/classNames/classNames';
import { Text } from '@/Shared/UI/Text';
import { HStack, VStack } from '@/Shared/UI/Stack';
import { Card } from '@/Shared/UI/Card';
import { AppImage } from '@/Shared/UI/AppImage';
import DefaultDoctorImage from '@/Shared/Assets/Images/DefaultDoctor.png';
import { useAppDispatch } from '@/Shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchDoctorsList } from '@/Pages/DoctorPage/Model/services/fetchDoctorsList';
import { shuffle } from '@/Shared/Helpers/shuffleRandomFunction/shuffleRandomFunction';
import { useInitialEffect } from '@/Shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { getDoctorPageData } from '@/Pages/DoctorPage/Model/selectors/doctorPageSelectors';
import { DoctorsPageSchema } from '@/Pages/DoctorPage/Model/types/doctorPageSchema';
import { Doctor } from '@/Entities/Doctor';
import { doctorPageReducer } from '@/Pages/DoctorPage/Model/slices/doctorPageSlice';
import DynamicModuleLoader, {
    ReducersList,
} from '@/Shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
interface MainPageInfoDoctorsProps {
    className?: string;
}
const reducers: ReducersList = {
    doctorPage: doctorPageReducer,
};
export const MainPageInfoDoctors = memo((props: MainPageInfoDoctorsProps) => {
    const { className } = props;
    const { t } = useTranslation('main');
    const [itemsData, setItemsData] = useState<Doctor[] | undefined>(undefined);
    const doctorsData = useSelector(getDoctorPageData);
    const dispatch = useAppDispatch();
    useInitialEffect(async () => {
        await dispatch(fetchDoctorsList());
    });
    useEffect(() => {
        if (doctorsData?.items) {
            const items = shuffle(
                doctorsData.items,
                doctorsData.items.length < 3 ? doctorsData.items.length : 3,
            );
            setItemsData(items);
        }
    }, [doctorsData?.items]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
            <VStack
                align="center"
                gap={'8'}
                className={classNames(cls.MainPageInfoDoctors, {}, [])}
            >
                <Text
                    align={'center'}
                    bold
                    variant={'primary'}
                    size={'l'}
                    text={t('Наши врачи')}
                />
                <HStack gap="8" className={classNames(cls.stretchAlign)}>
                    {itemsData &&
                        itemsData.map((item) => (
                            <>
                                <Card
                                    className={classNames(cls.cardContent)}
                                    variant={'outlined'}
                                    padding={'8'}
                                    border={'partialRound'}
                                >
                                    <AppImage
                                        src={DefaultDoctorImage}
                                        width={'60%'}
                                        height={'70%'}
                                    />
                                    <Text
                                        align={'center'}
                                        text={item.lastName}
                                        variant={'error'}
                                        size="m"
                                    />
                                    <Text
                                        align={'center'}
                                        text={item.firstName}
                                        variant={'error'}
                                        size="m"
                                    />
                                    <Text
                                        align={'center'}
                                        text={item.patronymic}
                                        variant={'error'}
                                        size="m"
                                    />
                                    <Text
                                        align={'center'}
                                        text={item.speciality}
                                        variant={'error'}
                                        size="m"
                                    />
                                </Card>
                            </>
                        ))}
                </HStack>
            </VStack>
        </DynamicModuleLoader>
    );
});
