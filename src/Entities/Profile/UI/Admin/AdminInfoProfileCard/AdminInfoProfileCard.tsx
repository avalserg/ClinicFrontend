import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/Shared/UI/Card';
import { Input } from '@/Shared/UI/Input';
import { Skeleton } from '@/Shared/UI/Skeleton';
import { HStack, VStack } from '@/Shared/UI/Stack';
import { Text } from '@/Shared/UI/Text';
import { AdminProfileCardProps } from '../AdminProfileCard/AdminProfileCard';

export const AdminProfileCardError = () => {
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

export const AdminProfileCardSkeleton = () => {
    return (
        <Card padding={'24'} border={'partialRound'} max>
            <VStack gap={'32'}>
                <HStack gap={'32'} max>
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

export const AdminInfoProfileCard = memo((props: AdminProfileCardProps) => {
    const { t } = useTranslation('profile');

    const {
        className,
        data,
        readonly,
        onChangeFirstName,
        onChangeLastName,
        onChangePatronymic,
    } = props;

    return (
        <Card padding={'24'} max className={className}>
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
            </VStack>
        </Card>
    );
});
