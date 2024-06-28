/* eslint-disable react/display-name */
import {
    ImgHTMLAttributes,
    ReactElement,
    memo,
    useLayoutEffect,
    useState,
} from 'react';
// import NoImage from '@/Shared/Assets/Images/noImage.jpg';
interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
}

export const AppImage = memo((props: AppImageProps) => {
    const {
        className,
        src,
        alt = 'image not found',
        fallback,
        errorFallback,
        ...otherProps
    } = props;
    const [isLoading, setIsLoading] = useState(true);
    // false!!!
    const [hasError, setHasError] = useState(false);

    // synh before mounted
    useLayoutEffect(() => {
        const img = new Image();
        img.src = src ?? '';
        // when img is downloaded
        img.onload = () => {
            setIsLoading(false);
        };
        img.onerror = () => {
            setIsLoading(false);
            setHasError(true);
        };
    }, [src]);

    if (isLoading && fallback) {
        return fallback;
    }
    if (hasError && errorFallback) {
        return errorFallback;
    }
    return (
        <img
            className={className}
            src={src}
            // onError={({ currentTarget }) => {
            //     currentTarget.onerror = null; // prevents looping
            //     currentTarget.src = NoImage;
            // }}
            alt={alt}
            {...otherProps}
        />
    );
});
