export enum AppRoutes {
    MAIN = 'main',
    MEDICAL_CARDS = 'medical_cards',
    APPOINTMENTS = 'appointments',
    DOCTORS = 'doctors',
    PATIENTS = 'patients',
    PRESCRIPTIONS = 'prescriptions',
    PATIENT_TICKETS = 'patient_tickets',
    REVIEWS = 'reviews',
    SETTINGS = 'settings',
    PATIENT_REGISTER = 'patient_register',
    DOCTOR_REGISTER = 'doctor_register',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN = 'forbidden',
    // last
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteMedicalCard = () => '/medicalCards';
export const getRouteAppointments = () => '/appointments';
export const getRouteDoctors = () => '/doctors';
export const getRoutePatients = () => '/patients';
export const getRoutePrescriptions = () => '/prescriptions';
export const getRoutePatientTickets = () => '/patientTickets';
export const getRouteReviews = () => '/reviews';
export const getRoutePatientRegister = () => '/patientRegister';
export const getRouteDoctorRegister = () => '/doctorRegister';
export const getRouteSettings = () => '/settings';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => `/articles`;
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticleCreate = () => `/articles/new`;
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteAdmin = () => `/admin`;
export const getRouteForbidden = () => `/forbidden`;

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRouteMedicalCard()]: AppRoutes.MEDICAL_CARDS,
    [getRouteAppointments()]: AppRoutes.APPOINTMENTS,
    [getRoutePrescriptions()]: AppRoutes.PRESCRIPTIONS,
    [getRouteDoctors()]: AppRoutes.DOCTORS,
    [getRoutePatients()]: AppRoutes.PATIENTS,
    [getRoutePatientTickets()]: AppRoutes.PATIENT_TICKETS,
    [getRouteReviews()]: AppRoutes.REVIEWS,
    [getRouteMain()]: AppRoutes.MAIN,
    [getRoutePatientRegister()]: AppRoutes.PATIENT_REGISTER,
    [getRouteDoctorRegister()]: AppRoutes.DOCTOR_REGISTER,
    [getRouteSettings()]: AppRoutes.SETTINGS,
    [getRouteAbout()]: AppRoutes.ABOUT,
    [getRouteProfile(':id')]: AppRoutes.PROFILE,
    [getRouteArticles()]: AppRoutes.ARTICLES,
    [getRouteArticleDetails(':id')]: AppRoutes.ARTICLE_DETAILS,
    [getRouteArticleCreate()]: AppRoutes.ARTICLE_CREATE,
    [getRouteArticleEdit(':id')]: AppRoutes.ARTICLE_EDIT,
    [getRouteAdmin()]: AppRoutes.ADMIN_PANEL,
    [getRouteForbidden()]: AppRoutes.FORBIDDEN,
};
