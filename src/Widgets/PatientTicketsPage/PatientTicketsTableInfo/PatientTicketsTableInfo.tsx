/* eslint-disable react/display-name */
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './AdminPanelButtonsItems.module.scss';
import { classNames } from '@/Shared/lib/classNames/classNames';
import { HStack } from '@/Shared/UI/Stack';
import { Button } from '@/Shared/UI/Button';
import { AppLink } from '@/Shared/UI/AppLink';
import { getRouteDoctorRegister } from '@/Shared/const/router';
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';

interface PatientTicketsTableInfoProps {
    className?: string;
}
type Person = {
    name: {
        firstName: string;
        lastName: string;
    };
    address: string;
    city: string;
    state: string;
};

// nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
    {
        name: {
            firstName: 'John',
            lastName: 'Doe',
        },
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
    },
    {
        name: {
            firstName: 'Jane',
            lastName: 'Doe',
        },
        address: '769 Dominic Grove',
        city: 'Columbus',
        state: 'Ohio',
    },
    {
        name: {
            firstName: 'Joe',
            lastName: 'Doe',
        },
        address: '566 Brakus Inlet',
        city: 'South Linda',
        state: 'West Virginia',
    },
    {
        name: {
            firstName: 'Kevin',
            lastName: 'Vandy',
        },
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
    },
    {
        name: {
            firstName: 'Joshua',
            lastName: 'Rolluffs',
        },
        address: '32188 Larkin Turnpike',
        city: 'Omaha',
        state: 'Nebraska',
    },
    {
        name: {
            firstName: 'Kevin',
            lastName: 'Vandy',
        },
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
    },
    {
        name: {
            firstName: 'Joshua',
            lastName: 'Rolluffs',
        },
        address: '32188 Larkin Turnpike',
        city: 'Omaha',
        state: 'Nebraska',
    },
    {
        name: {
            firstName: 'Kevin',
            lastName: 'Vandy',
        },
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
    },
    {
        name: {
            firstName: 'Joshua',
            lastName: 'Rolluffs',
        },
        address: '32188 Larkin Turnpike',
        city: 'Omaha',
        state: 'Nebraska',
    },
    {
        name: {
            firstName: 'Kevin',
            lastName: 'Vandy',
        },
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
    },
    {
        name: {
            firstName: 'Joshua',
            lastName: 'Rolluffs',
        },
        address: '32188 Larkin Turnpike',
        city: 'Omaha',
        state: 'Nebraska',
    },
    {
        name: {
            firstName: 'Kevin',
            lastName: 'Vandy',
        },
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
    },
    {
        name: {
            firstName: 'Joshua',
            lastName: 'Rolluffs',
        },
        address: '32188 Larkin Turnpike',
        city: 'Omaha',
        state: 'Nebraska',
    },
];
export const PatientTicketsTableInfo = memo(
    (props: PatientTicketsTableInfoProps) => {
        const { className } = props;
        const { t } = useTranslation('');
        // eslint-disable-next-line camelcase
        const columns = useMemo<MRT_ColumnDef<Person>[]>(
            () => [
                {
                    accessorKey: 'name.firstName', // access nested data with dot notation
                    header: 'N талона',
                    size: 50,
                },
                {
                    accessorKey: 'name.lastName',
                    header: 'Фамилия врача',
                    size: 150,
                },
                {
                    accessorKey: 'name.lastName',
                    header: 'Имя врача',
                    size: 150,
                },
                {
                    accessorKey: 'name.lastName',
                    header: 'Отчество врача',
                    size: 150,
                },
                {
                    accessorKey: 'address', // normal accessorKey
                    header: 'Специальность',
                    size: 200,
                },
                {
                    accessorKey: 'city',
                    header: 'N кабинета',
                    size: 150,
                },
                {
                    accessorKey: 'city',
                    header: 'Время посещения',
                    size: 150,
                },
                {
                    accessorKey: 'city',
                    header: 'Id врача',
                    size: 150,
                },
            ],
            [],
        );
        const table = useMaterialReactTable({
            columns,
            data,
        });
        return (
            <MaterialReactTable
                columns={columns}
                data={data}
                // enableColumnFilterModes
                enableColumnOrdering
                // enableEditing
                enableColumnPinning
                // enableRowActions
                // enableRowSelection
                enableSelectAll={false}
                initialState={{
                    showColumnFilters: true,
                    showGlobalFilter: true,
                }}
                // eslint-disable-next-line camelcase
                localization={MRT_Localization_RU}
            />
        );
    },
);
