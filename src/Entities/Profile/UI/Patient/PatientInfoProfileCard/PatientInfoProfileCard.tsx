/* eslint-disable react/display-name */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/Shared/UI/Card';
import { Input } from '@/Shared/UI/Input';
import { Skeleton } from '@/Shared/UI/Skeleton';
import { HStack, VStack } from '@/Shared/UI/Stack';
import { Text } from '@/Shared/UI/Text';
import { PatientProfileCardProps } from '../PatientProfileCard/PatientProfileCard';
import { dateConverter } from '@/Shared/Helpers/dateConverter/dateConverter';
import { ImageFileUploader } from '@/Features/ImageFileUploader';

export const PatientProfileCardError = () => {
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

export const PatientProfileCardSkeleton = () => {
    return (
        <Card padding={'24'} border={'partialRound'} max>
            <VStack gap={'32'}>
                <HStack max justify={'center'}>
                    <Skeleton border={'100%'} width={100} height={100} />
                </HStack>
                <HStack gap={'32'} max>
                    <VStack gap={'16'} max>
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
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};

export const PatientInfoProfileCard = memo((props: PatientProfileCardProps) => {
    const { t } = useTranslation('profile');

    const {
        className,
        data,
        readonly,
        onChangeFirstName,
        onChangeLastName,
        onChangeAddress,
        onChangePatronymic,
        onChangeAvatar,
        onChangeDateBirthday,
        onChangePhoneNumber,
        onChangePassportNumber,
    } = props;

    const dateBirthday = dateConverter(data?.dateBirthday!);

    return (
        <Card padding={'24'} max className={className}>
            <VStack gap={'32'}>
                <HStack justify={'center'} max>
                    <ImageFileUploader
                        avatar={data?.avatar}
                        id={data?.applicationUserId}
                        readonly={readonly}
                    />
                </HStack>

                <HStack gap={'24'} max>
                    <VStack gap={'16'} max>
                        <Input
                            value={data?.applicationUserId}
                            label={t('Ваш Id')}
                            readonly
                            data-testid={'ProfileCard.id'}
                        />

                        <Input
                            value={data?.lastName}
                            label={t('Ваша фамилия')}
                            onChange={onChangeLastName}
                            readonly={readonly}
                            data-testid={'ProfileCard.lastname'}
                        />
                        <Input
                            value={data?.firstName}
                            label={t('Ваше имя')}
                            onChange={onChangeFirstName}
                            readonly={readonly}
                            data-testid={'ProfileCard.lastname'}
                        />
                        <Input
                            value={data?.patronymic}
                            label={t('Ваше отчество')}
                            onChange={onChangePatronymic}
                            readonly={readonly}
                            data-testid={'ProfileCard.lastname'}
                        />
                    </VStack>
                    <VStack gap={'16'} max>
                        <Input
                            value={data?.address}
                            label={t('Ваш адрес')}
                            onChange={onChangeAddress}
                            readonly={readonly}
                        />
                        <Input
                            type="date"
                            value={dateBirthday}
                            label={t('Ваша дата рождения')}
                            onChange={onChangeDateBirthday}
                            readonly={readonly}
                        />

                        <Input
                            type={'tel'}
                            value={data?.phoneNumber?.value}
                            label={t('Ваш телефонный номер')}
                            onChange={onChangePhoneNumber}
                            readonly={readonly}
                        />
                        <Input
                            type={'tel'}
                            value={data?.passportNumber}
                            label={t('Ваш номер паспорта')}
                            onChange={onChangePassportNumber}
                            readonly={readonly}
                        />
                        {/* <Input
              value={data?.avatar}
              label={t("Ваш аватар")}
              onChange={onChangeAvatar}
              readonly={readonly}
            /> */}
                        {/* <CurrencySelect
              value={data?.currency}
              onChange={onChangeCurrency}
              readonly={readonly}
            />
            <CountrySelect
              value={data?.country}
              onChange={onChangeCountry}
              readonly={readonly}
            /> */}
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
});
