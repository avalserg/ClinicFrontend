/* eslint-disable react/display-name */
import { memo } from 'react';
import cls from './AdminPanelButtonsItems.module.scss';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/Shared/lib/classNames/classNames';
import { HStack } from '@/Shared/UI/Stack';
import { Button } from '@/Shared/UI/Button';
import { AppLink } from '@/Shared/UI/AppLink';
import { getRouteDoctorRegister } from '@/Shared/const/router';

interface AdminPanelButtonsItemsProps {
    className?: string;
}

export const AdminPanelButtonsItems = memo(
    (props: AdminPanelButtonsItemsProps) => {
        const { className } = props;
        const { t } = useTranslation('');

        return (
            <div
                className={classNames(cls.AdminPanelButtonsItems, {}, [
                    className,
                ])}
            >
                <HStack wrap="wrap" gap="16">
                    <Button>
                        <AppLink to={getRouteDoctorRegister()}>
                            {t('Добавить врача')}
                        </AppLink>
                    </Button>
                </HStack>
            </div>
        );
    },
);
