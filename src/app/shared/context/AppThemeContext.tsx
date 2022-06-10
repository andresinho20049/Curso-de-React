import { ThemeProvider } from "@mui/material";
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { useCustomTheme } from "../hooks";
import usePersistedState from "../hooks/UsePersistedState";
import { DarkTheme, LightTheme } from "../themes";


interface IAppThemeContextData {
    themeName: 'dark' | 'light' | 'custom';
    setThemeName: (themeName: 'dark' | 'light' | 'custom') => void;
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

    const { getCustomTheme } = useCustomTheme();

    const theme = useMemo(() => {
        
        switch (themeName) {
            case "dark":
                return DarkTheme;
            
            case "light":
                return LightTheme;

            case "custom":
                return getCustomTheme();

            default:
                return LightTheme;
        }

    }, [themeName]);

    return (
        <AppThemeContext.Provider value={{ themeName, setThemeName }}>
            <ThemeProvider theme={theme}>
                    {children}
            </ThemeProvider>
        </AppThemeContext.Provider>
    )
}