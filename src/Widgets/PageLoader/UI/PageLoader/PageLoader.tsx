import { classNames } from '@/Shared/lib/classNames/classNames';

import cls from './PageLoader.module.scss';

import { Loader } from '../../../../Shared/UI/Loader/Loader';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => {
    return (
        <div className={classNames(cls.PageLoader, {}, [className])}>
            <Loader />
        </div>
    );
};

export default PageLoader;
