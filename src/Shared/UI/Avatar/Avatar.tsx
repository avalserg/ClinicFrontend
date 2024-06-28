import React, { CSSProperties, ImgHTMLAttributes, useMemo } from 'react';
import cls from './Avatar.module.scss';
import { Mods, classNames } from '@/Shared/lib/classNames/classNames';
import { AppImage } from '../AppImage';
import UserIcon from '../../Assets/Icons/user-filled.svg';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}

export const Avatar = (props: AvatarProps) => {
    const { className, src, size = 100, alt } = props;
    const mods: Mods = {};
    const styles = useMemo<CSSProperties>(() => {
        return {
            width: size,
            height: size,
        };
    }, [size]);
    const fallback = <Skeleton width={size} height={size} border={'50%'} />;
    const errorFallback = <Icon Svg={UserIcon} width={size} height={size} />;
    return (
        <AppImage
            fallback={fallback}
            errorFallback={errorFallback}
            style={styles}
            alt={alt}
            src={src}
            className={classNames(cls.Avatar, mods, [className])}
        />
    );
};
