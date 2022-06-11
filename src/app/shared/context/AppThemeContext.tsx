import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import usePersistedState from "../hooks/UsePersistedState";
import { DarkTheme, LightTheme } from "../themes";

interface IAppThemeContextData {
    themeName: 'dark' | 'light' | 'custom';
    setThemeName: (themeName: 'dark' | 'light' | 'custom') => void;

    customTheme: ThemeOptions | null;
    setCustomTheme: (themeProps: ThemeOptions) => void;
}

export const AppThemeContext = createContext({} as IAppThemeContextData);

export const useAppThemeContext = () => {
    return useContext(AppThemeContext);
}

interface IAppThemeProviderProps {
    children: ReactNode
}

export const AppThemeProvider = ({ children }: IAppThemeProviderProps) => {
    const [themeName, setThemeName] = usePersistedState<"dark" | "light" | "custom">("theme", "light");
    const [customTheme, setCustomTheme] = usePersistedState<ThemeOptions | null>('customTheme', null);

    const theme = useMemo(() => {

        switch (themeName) {
            case "dark":
                return DarkTheme;

            case "light":
                return LightTheme;

            case "custom":
                if (!customTheme) {
                    setThemeName('dark')
                    return DarkTheme;
                }
                return createTheme(customTheme)

            default:
                return LightTheme;
        }

    }, [customTheme, themeName]);

    return (
        <AppThemeContext.Provider value={{ themeName, setThemeName, customTheme, setCustomTheme }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </AppThemeContext.Provider>
    )
}