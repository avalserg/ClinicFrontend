/* eslint-disable react/display-name */
import { Suspense, memo, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { classNames } from '@/Shared/lib/classNames/classNames';

import { getUserInited, initAuthData } from '@/Entities/ApplicationUser';
import { AppLoaderLayout } from '@/Shared/Layouts/AppLoaderLayout';
import { MainLayout } from '@/Shared/Layouts/MainLayout';
import { useAppDispatch } from '@/Shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/Shared/lib/hooks/useTheme/useTheme';
import { Navbar } from '@/Widgets/Navbar';
import { SideBar } from '@/Widgets/SideBar';
import { AppRouter } from './Providers/Router';
import { withTeme } from './Providers/ThemeProvider/UI/withTheme';
import { useAppToolbar } from './lib/useAppToolbar';

const App = memo(() => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);
    const toolbar = useAppToolbar();
    useEffect(() => {
        if (!inited) {
            void dispatch(initAuthData());
        }
    }, [dispatch, inited]);
    if (!inited) {
        return (
            <div id="app" className={classNames('app_redesigned', {}, [theme])}>
                <AppLoaderLayout />
            </div>
        );
    }
    return (
        <div id="app" className={classNames('app_redesigned', {}, [theme])}>
            <Suspense fallback="">
                <MainLayout
                    header={<Navbar />}
                    content={<AppRouter />}
                    sidebar={<SideBar />}
                    toolbar={toolbar}
                />
            </Suspense>
        </div>
    );
});

export default withTeme(App);
