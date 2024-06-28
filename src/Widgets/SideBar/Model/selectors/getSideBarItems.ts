import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/Entities/ApplicationUser';
import {
    getRouteAbout,
    getRouteAdmin,
    getRouteArticles,
    getRouteDoctors,
    getRouteMain,
    getRouteMedicalCard,
    getRoutePatientTickets,
    getRoutePrescriptions,
    getRouteProfile,
    getRoutePatientRegister,
    getRouteReviews,
    getRouteSettings,
    getRouteAppointments,
    getRoutePatients,
} from '@/Shared/const/router';
import { SidebarItemType } from '../types/sidebar';

import AboutIcon from '@/Shared/Assets/Icons/Info.svg';
import ArticleIcon from '@/Shared/Assets/Icons/article.svg';
import PatientIcon from '@/Shared/Assets/Icons/patient.svg';
import MainIcon from '@/Shared/Assets/Icons/home.svg';
import RegisterIcon from '@/Shared/Assets/Icons/register-icon.svg';
import MedicalCardIcon from '@/Shared/Assets/Icons/medical_card2.svg';
import PrescriptionsIcon from '@/Shared/Assets/Icons/patient_tickets.svg';
import PatientTicketsIcon from '@/Shared/Assets/Icons/medical_card.svg';
import ReviewsIcon from '@/Shared/Assets/Icons/reviews.svg';
import SettingsIcon from '@/Shared/Assets/Icons/settings.svg';
import DoctorIcon from '@/Shared/Assets/Icons/doctor.svg';
import PrescriptionIcon from '@/Shared/Assets/Icons/medicine.svg';
import AdminPanelIcon from '@/Shared/Assets/Icons/admin_panel.svg';
import { ApplicationUserRoleName } from '@/Entities/ApplicationUser/Model/consts/applicationUserConsts';

// reselect
export const useSideBarItems = () => {
    const userData = useSelector(getUserAuthData);
    const userRole = userData?.applicationUserRole;
    const authData = useSelector(getUserAuthData);
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: MainIcon,
            text: 'Главная',
        },

        {
            path: getRouteAbout(),
            Icon: AboutIcon,
            text: 'О сайте',
        },
    ];
    if (!userData) {
        sidebarItemsList.push({
            path: getRoutePatientRegister(),
            Icon: RegisterIcon,
            text: 'Регистрация',
        });
    }
    if (
        userData?.applicationUserRole.name.toUpperCase() ===
        ApplicationUserRoleName.PATIENT
    ) {
        // sidebarItemsList.splice(1, 1);
        sidebarItemsList.push(
            {
                path: getRoutePatientTickets(),
                Icon: PatientTicketsIcon,
                text: 'Талоны',

                authOnly: true,
            },
            {
                path: getRoutePrescriptions(),
                Icon: PrescriptionIcon,
                text: 'Рецепты',
                authOnly: true,
            },
            {
                path: getRouteDoctors(),
                Icon: DoctorIcon,
                text: 'Врачи',
                authOnly: true,
            },
            {
                path: getRouteReviews(),
                Icon: ReviewsIcon,
                text: 'Отзывы',
                authOnly: true,
            },

            {
                path: getRouteProfile(authData!.applicationUserId),
                Icon: SettingsIcon,
                text: 'Профиль',
                authOnly: true,
            },
        );
    }
    if (
        userData?.applicationUserRole.name.toUpperCase() ===
        ApplicationUserRoleName.DOCTOR
    ) {
        // sidebarItemsList.splice(1, 1);
        sidebarItemsList.push(
            {
                path: getRouteMedicalCard(),
                Icon: MedicalCardIcon,
                text: 'Медицинские карты',
                authOnly: true,
            },
            {
                path: getRoutePatientTickets(),
                Icon: PatientTicketsIcon,
                text: 'Талоны',
                authOnly: true,
            },
            {
                path: getRoutePrescriptions(),
                Icon: PrescriptionIcon,
                text: 'Рецепты',
                authOnly: true,
            },
            {
                path: getRouteAppointments(),
                Icon: PrescriptionsIcon,
                text: 'Приемы',
                authOnly: true,
            },
            {
                path: getRouteDoctors(),
                Icon: DoctorIcon,
                text: 'Врачи',
                authOnly: true,
            },
            {
                path: getRouteReviews(),
                Icon: ReviewsIcon,
                text: 'Отзывы',
                authOnly: true,
            },

            {
                path: getRouteProfile(authData!.applicationUserId),
                Icon: SettingsIcon,
                text: 'Профиль',
                authOnly: true,
            },
        );
    }
    if (
        userData?.applicationUserRole.name.toUpperCase() ===
        ApplicationUserRoleName.ADMIN
    ) {
        // sidebarItemsList.splice(1, 1);
        sidebarItemsList.push(
            {
                path: getRouteMedicalCard(),
                Icon: MedicalCardIcon,
                text: 'Медицинские карты',
                authOnly: true,
            },
            {
                path: getRoutePatientTickets(),
                Icon: PatientTicketsIcon,
                text: 'Талоны',

                authOnly: true,
            },
            {
                path: getRoutePrescriptions(),
                Icon: PrescriptionIcon,
                text: 'Рецепты',
                authOnly: true,
            },
            {
                path: getRouteAppointments(),
                Icon: PrescriptionsIcon,
                text: 'Приемы',
                authOnly: true,
            },
            {
                path: getRouteDoctors(),
                Icon: DoctorIcon,
                text: 'Врачи',
                authOnly: true,
            },
            {
                path: getRoutePatients(),
                Icon: PatientIcon,
                text: 'Пациенты',
                authOnly: true,
            },
            {
                path: getRouteAdmin(),
                Icon: AdminPanelIcon,
                text: 'Админ панель',
                authOnly: true,
            },
            {
                path: getRouteReviews(),
                Icon: ReviewsIcon,
                text: 'Отзывы',
                authOnly: true,
            },

            {
                path: getRouteProfile(authData!.applicationUserId),
                Icon: SettingsIcon,
                text: 'Профиль',
                authOnly: true,
            },
        );
    }
    // if (userData) {
    //   // remove register from list
    //   sidebarItemsList.splice(1,1);
    //   sidebarItemsList.push(
    //     {
    //       path: getRouteProfile(userData.applicationUserId),
    //       Icon: ProfileIcon,
    //       text: "Профиль",
    //       authOnly: true,
    //     },
    //     {
    //       path: getRouteArticles(),
    //       Icon: ArticleIcon,
    //       text: "Статьи",
    //       authOnly: true,
    //     },
    //   );

    // }
    return sidebarItemsList;
};
