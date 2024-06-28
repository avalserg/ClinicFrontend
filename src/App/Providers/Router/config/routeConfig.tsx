import { ApplicationUserRoleName } from '@/Entities/ApplicationUser';
import { AboutPage } from '@/Pages/AboutPage';
import { AdminPanelPage } from '@/Pages/AdminPanelPage';
import { ArticleDetailsPage } from '@/Pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/Pages/ArticleEditPage';
import { ArticlesPage } from '@/Pages/ArticlesPage';
import { AppointmentsPage } from '@/Pages/AppointmentsPage';
import { DoctorPage } from '@/Pages/DoctorPage';
import { ForbiddenPage } from '@/Pages/ForbiddenPage';
import { MainPage } from '@/Pages/MainPage';
import { MedicalCardPage } from '@/Pages/MedicalCardPage';
import { NotFoundPage } from '@/Pages/NotFoundPage';
import { PatientTicketPage } from '@/Pages/PatientTicketPage';
import { PrescriptionPage } from '@/Pages/PrescriptionPage';
import { ProfilePage } from '@/Pages/ProfilePage';
import { RegisterDoctorPage } from '@/Pages/RegisterDoctorPage';
import { RegisterPatientPage } from '@/Pages/RegisterPatientPage';
import { ReviewsPage } from '@/Pages/ReviewsPage';
import { SettingsPage } from '@/Pages/SettingsPage';
import { AppRouteProps } from '@/Shared/Types/router';
import {
    AppRoutes,
    getRouteProfile,
    getRouteAbout,
    getRoutePatients,
    getRouteAdmin,
    getRouteArticleCreate,
    getRouteArticleDetails,
    getRouteArticleEdit,
    getRouteForbidden,
    getRouteArticles,
    getRouteMain,
    getRouteSettings,
    getRoutePatientRegister,
    getRouteMedicalCard,
    getRoutePatientTickets,
    getRouteReviews,
    getRouteDoctors,
    getRoutePrescriptions,
    getRouteDoctorRegister,
    getRouteAppointments,
} from '@/Shared/const/router';
import { PatientPage } from '@/Pages/PatientPage';

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.MEDICAL_CARDS]: {
        path: getRouteMedicalCard(),
        element: <MedicalCardPage />,
        authOnly: true,
    },
    [AppRoutes.DOCTORS]: {
        path: getRouteDoctors(),
        element: <DoctorPage />,
        authOnly: true,
    },
    [AppRoutes.PATIENTS]: {
        path: getRoutePatients(),
        element: <PatientPage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: getRouteAdmin(),
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [ApplicationUserRoleName.ADMIN],
    },
    [AppRoutes.PRESCRIPTIONS]: {
        path: getRoutePrescriptions(),
        element: <PrescriptionPage />,
        authOnly: true,
    },
    [AppRoutes.APPOINTMENTS]: {
        path: getRouteAppointments(),
        element: <AppointmentsPage />,
        authOnly: true,
    },
    [AppRoutes.PATIENT_TICKETS]: {
        path: getRoutePatientTickets(),
        element: <PatientTicketPage />,
        authOnly: true,
    },
    [AppRoutes.REVIEWS]: {
        path: getRouteReviews(),
        element: <ReviewsPage />,
        authOnly: true,
    },
    [AppRoutes.PATIENT_REGISTER]: {
        path: getRoutePatientRegister(),
        element: <RegisterPatientPage />,
    },
    [AppRoutes.DOCTOR_REGISTER]: {
        path: getRouteDoctorRegister(),
        element: <RegisterDoctorPage />,
        roles: [ApplicationUserRoleName.ADMIN],
        authOnly: true,
    },
    [AppRoutes.SETTINGS]: {
        path: getRouteSettings(),
        element: <SettingsPage />,
        authOnly: true,
    },
    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLES]: {
        path: getRouteArticles(),
        element: <ArticlesPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: getRouteArticleDetails(':id'),
        element: <ArticleDetailsPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_CREATE]: {
        path: getRouteArticleCreate(),
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_EDIT]: {
        path: getRouteArticleEdit(':id'),
        element: <ArticleEditPage />,
        authOnly: true,
    },
    // [AppRoutes.ADMIN_PANEL]: {
    //   path: getRouteAdmin(),
    //   element: <AdminPanelPage />,
    //   authOnly: true,
    //   roles: [UserRole.MANAGER, UserRole.ADMIN],
    // },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
};
