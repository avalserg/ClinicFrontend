import { useTranslation } from 'react-i18next';
import { Page } from '@/Widgets/Page';
import { VStack } from '@/Shared/UI/Stack';
import { Text } from '@/Shared/UI/Text';

const AboutPage = () => {
    const { t } = useTranslation('about');
    return (
        <Page data-testid={'AboutPage'}>
            <VStack justify={'between'} gap="16" max>
                <Text
                    align="center"
                    title={t(
                        'Приложение для автоматизации процессов обслуживания пациентов в учреждениях здравоохранения',
                    )}
                />
                <Text
                    align={'left'}
                    size={'m'}
                    text="Предоставляет возможность регистрации в системе с автоматическим созданием электронной медицинской карты, возможность заказа талонов на приемы к врачам, создание отзывов о качестве обслуживания в учреждениях здраоохранения, централизованного хранения информации о пациентах, врачах, данных приема, рецептах, талонах на приемы"
                />
            </VStack>
        </Page>
    );
};

export default AboutPage;
