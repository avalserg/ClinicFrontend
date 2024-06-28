/* eslint-disable react/display-name */
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    // eslint-disable-next-line camelcase
    MRT_ColumnDef,
    MaterialReactTable,
} from 'material-react-table';
// eslint-disable-next-line camelcase
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import { useSelector } from 'react-redux';
import { useInitialEffect } from '@/Shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Review } from '@/Entities/Review';
import { useAppDispatch } from '@/Shared/lib/hooks/useAppDispatch/useAppDispatch';

import { reviewsPageReducer } from '../../Model/slices/reviewsPageSlice';
import DynamicModuleLoader, {
    ReducersList,
} from '@/Shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fetchAllReviewsList } from '../../Model/services/fetchReviewsList';
import {
    getReviewsData,
    getReviewsPageIsLoading,
} from '../../Model/selectors/reviewsPageSelectors';
import { isUserAdmin } from '@/Entities/ApplicationUser';

interface ReviewsPageTableInfoProps {
    className?: string;
}

const reducers: ReducersList = {
    reviewsPage: reviewsPageReducer,
};

export const ReviewsPageTableInfo = memo((props: ReviewsPageTableInfoProps) => {
    const { className } = props;
    const { t } = useTranslation('');
    const isAdmin = useSelector(isUserAdmin);
    const isLoading = useSelector(getReviewsPageIsLoading);
    const dispatch = useAppDispatch();
    const formPatientData = useSelector(getReviewsData);
    useInitialEffect(() => {
        dispatch(fetchAllReviewsList());
    });
    // eslint-disable-next-line camelcase
    const columns = useMemo<MRT_ColumnDef<Review>[]>(
        () => [
            {
                accessorFn: (row) => row?.id,
                header: 'N отзыва',
                accessorKey: 'id',
                size: 50,
            },
            {
                accessorFn: (row) => row?.lastName,
                header: 'Фамилия',
                accessorKey: 'lastName',
                size: 50,
            },
            {
                accessorFn: (row) => row?.firstName,
                header: 'Имя',
                accessorKey: 'firstName',
                size: 50,
            },

            {
                accessorFn: (row) => row?.patronymic,
                header: 'Отчество',
                accessorKey: 'patronymic',
                size: 50,
            },
            {
                accessorFn: (row) => row?.description,
                header: 'Текст отзыва',
                accessorKey: 'description',
                size: 150,
            },
            {
                accessorFn: (row) =>
                    row?.createdDate
                        ?.toString()
                        .split('.')[0]
                        .replace('T', ' '),
                header: 'Время создания',
                accessorKey: 'createdDate',
                size: 150,
            },
            {
                accessorFn: (row) => row?.patientId,
                header: 'Id пользователя',
                accessorKey: 'patientId',
                size: 150,
            },
        ],
        [],
    );
    return (
        <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
            {formPatientData?.items && (
                <MaterialReactTable
                    columns={columns}
                    data={formPatientData.items}
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
                        showSkeletons: !!isLoading,
                        columnVisibility: {
                            id: !!isAdmin,
                        },
                    }}
                    // eslint-disable-next-line camelcase
                    localization={MRT_Localization_RU}
                />
            )}
        </DynamicModuleLoader>
    );
});
