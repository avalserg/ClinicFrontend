/* eslint-disable react/display-name */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './PatientTicketsButtonsItems.module.scss';
import { classNames } from '@/Shared/lib/classNames/classNames';
import { HStack } from '@/Shared/UI/Stack';
import { Button } from '@/Shared/UI/Button';
import { AppLink } from '@/Shared/UI/AppLink';
import { getRouteDoctorRegister } from '@/Shared/const/router';

interface PatientTicketsButtonsItemsProps {
    className?: string;
}

export const PatientTicketsButtonsItems = memo(
    (props: PatientTicketsButtonsItemsProps) => {
        const { className } = props;
        const { t } = useTranslation('');

        return (
            <div
                className={classNames(cls.PatientTicketsButtonsItems, {}, [
                    className,
                ])}
            >
                <HStack wrap="wrap" gap="16">
                    <Button color={'success'}>Взять талон</Button>
                </HStack>
            </div>
        );
    },
);
