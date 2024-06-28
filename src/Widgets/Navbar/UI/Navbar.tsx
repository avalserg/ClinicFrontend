import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData} from '@/Entities/ApplicationUser';
import { LoginModal } from '@/Features/AuthByUserName';
import { AvatarDropdown } from '@/Features/avatarDropdown';
import { Button } from '@/Shared/UI/Button';
import { HStack } from '@/Shared/UI/Stack';
import { classNames } from '@/Shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { Text } from '@/Shared/UI/Text';


interface NavbarProps {
    className?: string;
}

const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);
   
 
   
    // ссылки передаваемые пропсами нужно сохранять
    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);
    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);
    const mainClass = cls.NavbarRedesigned;
    // if user authorized
    if (authData) {
        return (
           
                <header className={classNames(mainClass, {}, [className])}>
                    <HStack gap={'16'} align={'center'} className={cls.actions}>
                        {/* <NotificationButton /> */}
                        <Text text={`${authData.login}`} align="center" />
                        <AvatarDropdown />
                    </HStack>
                </header>
            
        );
    }
    return (
        <header className={classNames(mainClass, {}, [className])}>
            <Button
                variant={'clear'}
                className={cls.links}
                onClick={onShowModal}
            >
                {t('Войти')}
            </Button>

            {isAuthModal && (
                <LoginModal onClose={onCloseModal} isOpen={isAuthModal} />
            )}
        </header>
    );
});
Navbar.displayName = 'Navbar';
export default Navbar;
