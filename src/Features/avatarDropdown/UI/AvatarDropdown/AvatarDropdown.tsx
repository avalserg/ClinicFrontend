/* eslint-disable indent */
/* eslint-disable react/display-name */
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import cls from './AvatarDropdown.module.scss';
import { classNames } from '@/Shared/lib/classNames/classNames';
import {
    getRouteAdmin,
    getRouteProfile,
    getRouteSettings,
} from '@/Shared/const/router';
import {
    getUserAuthData,
    initAuthData,
    isUserAdmin,
    isUserDoctor,
    isUserPatient,
    userActions,
} from '@/Entities/ApplicationUser';
import { Avatar } from '@/Shared/UI/Avatar';
import { Dropdown } from '@/Shared/UI/Popups';
import { logoutUser } from '@/Entities/ApplicationUser/Model/services/logoutUser';
import { getPatientData } from '@/Entities/Patient';
import { getPatientProfileData } from '@/Features/editableProfileCard/Model/selectors/getPatientData/getPatientData';
import { getProfileForm } from '@/Features/editableProfileCard/Model/selectors/getProfileForm/getProfileForm';
import DynamicModuleLoader, {
    ReducersList,
} from '@/Shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileReducer } from '@/Features/editableProfileCard';
import { fetchPatientProfileData } from '@/Features/editableProfileCard/Model/services/fetchProfileData/fetchProfileData';
import { useAppDispatch } from '@/Shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/Shared/lib/hooks/useInitialEffect/useInitialEffect';

interface AvatarDropdownProps {
    className?: string;
    avatar?: string;
}
const reducers: ReducersList = {
    profile: profileReducer,
};
export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className, avatar } = props;
    const { t } = useTranslation('');
    const authData = useSelector(getUserAuthData);

    const dispatch = useAppDispatch();
    const isAdmin = useSelector(isUserAdmin);
    const isPatient = useSelector(isUserPatient);
   
    const onLogout = useCallback(() => {
        dispatch(logoutUser());
    }, [dispatch]);
    const isAdminPanelAvailable = isAdmin;
    if (!authData) {
        return null;
    }
    const items = [
        ...(isAdminPanelAvailable
            ? [
                  {
                      content: t('Админ панель'),
                      href: getRouteAdmin(),
                  },
              ]
            : []),

        {
            content: t('Профиль'),
            href: getRouteProfile(authData.applicationUserId),
        },
        {
            content: t('Выйти'),
            onClick: onLogout,
        },
    ];

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Dropdown
                direction={'bottom left'}
                className={classNames(cls.AvatarDropdown, {}, [className])}
                items={items}
                trigger={
                    <Avatar
                        size={40}
                        src={
                            isPatient
                                ? `http://localhost:5015/avatars/${authData.avatar}`
                                : `http://localhost:5015/images/${authData.avatar}`
                        }
                    />
                }
            />
        </DynamicModuleLoader>
    );
});
