import { ReactNode, useEffect, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from '@/Shared/const/localStorage';
import { Theme } from '@/Shared/const/theme';
import { ThemeContext } from '../../../../Shared/lib/context/ThemeContext';

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}

// последняя выбранная тема
const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

const ThemeProvider = (props: ThemeProviderProps) => {
    const { initialTheme, children } = props;
    const [isThemeInited, setThemeInited] = useState(false);

    const [theme, setTheme] = useState<Theme>(
        initialTheme || fallbackTheme || Theme.LIGHT,
    );

    useEffect(() => {
        if (!isThemeInited && initialTheme) {
            setTheme(initialTheme);
            setThemeInited(true);
        }
    }, [initialTheme, isThemeInited]);
    // for scroll theme
    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    }, [theme]);
    // если ничего не поменялось не перерендеривать компонент
    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );
    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
