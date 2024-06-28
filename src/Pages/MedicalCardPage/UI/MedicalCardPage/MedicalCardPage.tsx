import { useTranslation } from 'react-i18next';
// import DataTable from 'react-data-table-component';
import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import { Page } from '@/Widgets/Page';
import { HStack, VStack } from '@/Shared/UI/Stack';
import { Text } from '@/Shared/UI/Text';
import { MedicalCardsPageTableInfo } from '../MedicalCardPageTableInfo/MedicalCardPageTableInfo';
// example data type

const MedicalCardPage = () => {
    const { t } = useTranslation();

    return (
        <Page data-testid={'RegisterPage'}>
           
            {/* <PatientTicketsButtonsItems /> */}
            <MedicalCardsPageTableInfo />
        </Page>
    );
};

export default MedicalCardPage;
