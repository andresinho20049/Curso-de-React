import { Box, ThemeProvider } from "@mui/material";
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { LightTheme, DarkTheme } from "../themes";

interface IThemeContextData {
    themeName: 'dark' | 'light';
    toggleTheme: () => void;
}

export const AppThemeContext = createContext({} as IThemeContextData);

interface IThemeProviderProps {
    children: ReactNode
}

export const useAppThemeContext = () => {
    return useContext(AppThemeContext);
}

export const AppThemeProvider = ({ children }: IThemeProviderProps) => {
    const [themeName, setThemeName] = useState<'dark' | 'light'>('light');

    const toggleTheme = useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
    }, []);

    const theme = useMemo(() => {
        if (themeName === 'dark') return DarkTheme;

        return LightTheme;
    }, [themeName]);

    return (
        <AppThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                    {children}
            </ThemeProvider>
        </AppThemeContext.Provider>
    )
}