import React, {
    memo,
    useState,
    useEffect,
    useRef,
    ReactNode,
    TextareaHTMLAttributes,
} from 'react';
import { Mods, classNames } from '@/Shared/lib/classNames/classNames';
import cls from './TextArea.module.scss';
import { HStack } from '../Stack';
import { Text } from '../Text';
// исключаем из стандартных props input "value" | "onChange"
type HTMLTextAreaProps = Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange' | 'readOnly' | 'size'
>;

type InputSize = 's' | 'm' | 'l';

interface TextAreaProps extends HTMLTextAreaProps {
    className?: string;
    value?: string | number;
    label?: string;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    readonly?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
    size?: InputSize;
}
// memo избегаем лишних перерисовок
export const TextArea = memo((props: TextAreaProps) => {
    const {
        className,
        value,
        onChange,
        placeholder,
        autofocus,
        readonly,
        addonLeft,
        addonRight,
        label,
        size = 'm',
        ...otherProps
    } = props;
    const ref = useRef<HTMLTextAreaElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls.focused]: isFocused,
        [cls.withAddonLeft]: Boolean(addonLeft),
        [cls.withAddonRight]: Boolean(addonRight),
    };
    const textarea = (
        <div
            className={classNames(cls.TextAreaWrapper, mods, [
                className,
                cls[size],
            ])}
        >
            <textarea
                ref={ref}
                value={value}
                onChange={onChangeHandler}
                className={cls.textarea}
                onFocus={onFocus}
                onBlur={onBlur}
                readOnly={readonly}
                placeholder={placeholder}
                {...otherProps}
            />
        </div>
    );
    if (label) {
        return (
            <HStack max gap={'8'}>
                <Text text={label} />
                {textarea}
            </HStack>
        );
    }
    return textarea;
});
