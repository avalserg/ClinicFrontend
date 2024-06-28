/* eslint-disable react/display-name */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/Shared/UI/Card';
import { Input } from '@/Shared/UI/Input';
import { Skeleton } from '@/Shared/UI/Skeleton';
import { HStack, VStack } from '@/Shared/UI/Stack';
import { Text } from '@/Shared/UI/Text';
import { DoctorProfileCardProps } from '../DoctorProfileCard/DoctorProfileCard';
import { dateConverter } from '@/Shared/Helpers/dateConverter/dateConverter';
import { DoctorCategorySelect } from '@/Entities/DoctorCategory';
import { ImageFileUploader } from '@/Features/ImageFileUploader';
import { getDoctorProfileForm } from '@/Features/editableProfileCard/Model/selectors/getProfileForm/getProfileForm';
import { useSelector } from 'react-redux';

export const DoctorProfileCardError = () => {
    const { t } = useTranslation();
    return (
        <HStack justify={'center'} max>
            <Text
                variant={'error'}
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                align={'center'}
            />
        </HStack>
    );
};

export const DoctorProfileCardSkeleton = () => {
    return (
        <Card padding={'24'} border={'partialRound'} max>
            <VStack gap={'32'}>
                <HStack max justify={'center'}>
                    <Skeleton width={130} height={200} />
                </HStack>
                <HStack gap={'32'} max>
                    <VStack gap={'16'} max>
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                    </VStack>
                    <VStack gap={'16'} max>
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'20%'} height={38} />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};

export const DoctorInfoProfileCard = memo((props: DoctorProfileCardProps) => {
    const { t } = useTranslation('profile');

    const {
        className,
        data,
        readonly,
        onChangeFirstName,
        onChangeLastName,
        onChangePatronymic,
        onChangeAddress,
        onChangeDateBirthday,
        onChangeCategory,
        onChangePhoneNumber,
        onChangeCabinetNumber,
        onChangeExperience,
    } = props;

    const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.type = 'number';
    };

    const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value) {
            event.target.type = 'text';
        }
    };
    const handlePhoneInputFocus = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (event.target.value.length === 0) {
            event.target.value = '+375';
        }
    };
    const dateBirthday = dateConverter(data?.dateBirthday!);

    return (
        <Card padding={'24'} max className={className}>
            <VStack gap={'32'}>
                {data?.photo && (
                    <HStack justify={'center'} max>
                        <ImageFileUploader
                            avatar={data?.photo}
                            id={data?.applicationUserId}
                            readonly={readonly}
                        />
                    </HStack>
                )}
                <HStack gap={'24'} max>
                    <VStack gap={'16'} max>
                        <Input
                            value={data?.applicationUserId}
                            label={t('Id')}
                            readonly
                            data-testid={'ProfileCard.firstname'}
                        />

                        <Input
                            value={data?.lastName}
                            label={t('Фамилия')}
                            onChange={onChangeLastName}
                            readonly={readonly}
                            data-testid={'ProfileCard.lastname'}
                        />
                        <Input
                            value={data?.firstName}
                            label={t('Имя')}
                            onChange={onChangeFirstName}
                            readonly={readonly}
                            data-testid={'ProfileCard.lastname'}
                        />
                        <Input
                            value={data?.patronymic}
                            label={t('Отчество')}
                            onChange={onChangePatronymic}
                            readonly={readonly}
                            data-testid={'ProfileCard.lastname'}
                        />
                        <Input
                            type="date"
                            value={dateBirthday}
                            label={t('Дата рождения')}
                            onChange={onChangeDateBirthday}
                            readonly={readonly}
                        />
                    </VStack>
                    <VStack gap={'16'} max>
                        <Input
                            value={data?.address}
                            label={t('Адрес')}
                            onChange={onChangeAddress}
                            readonly={readonly}
                        />
                        <Input
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            value={data?.experience}
                            label={t('Стаж')}
                            onChange={onChangeExperience}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.cabinetNumber}
                            label={t('Кабинет')}
                            onChange={onChangeCabinetNumber}
                            readonly={readonly}
                        />
                        <Input
                            type={'tel'}
                            onFocus={handlePhoneInputFocus}
                            value={data?.phoneNumber?.value}
                            label={t('Номер телефона')}
                            onChange={onChangePhoneNumber}
                            readonly={readonly}
                        />
                        <DoctorCategorySelect
                            value={data?.category}
                            onChange={onChangeCategory}
                            readonly={readonly}
                        />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
});
