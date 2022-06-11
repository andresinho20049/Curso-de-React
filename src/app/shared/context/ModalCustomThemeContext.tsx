import { createTheme, Theme, ThemeOptions, useTheme } from "@mui/material";
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { useAppThemeContext } from "./AppThemeContext";


interface IModalCustomThemeContextData {
    theme: Theme;
    customThemeProps: ThemeOptions;
    applyTheme: (customThemeProps: ThemeOptions) => void;
    setCustomThemeProps: (customThemeProps: ThemeOptions) => void;
}

export const ModalCustomThemeContext = createContext({} as IModalCustomThemeContextData);

export const useModalCustomThemeContext = () => {
    return useContext(ModalCustomThemeContext);
}

interface IModalCustomThemeProviderProps {
    children: ReactNode;
}

export const ModalCustomThemeProvider = ({ children }: IModalCustomThemeProviderProps) => {

    const { customTheme, setCustomTheme, setThemeName } = useAppThemeContext();

    const atualTheme = useTheme();
    const [customThemeProps, setCustomThemeProps] = useState<ThemeOptions>(customTheme || atualTheme as ThemeOptions);

    const theme = useMemo(() => {
        return createTheme(customThemeProps);

    }, [customThemeProps])

    const applyTheme = useCallback((customThemeProps: ThemeOptions) => {
        console.log('apply', customThemeProps)
        setCustomThemeProps(customThemeProps)
        setCustomTheme(customThemeProps);
        setThemeName('custom');
    }, [])

    return (
        <ModalCustomThemeContext.Provider value={{ theme, customThemeProps, setCustomThemeProps, applyTheme }}>
            {children}
        </ModalCustomThemeContext.Provider>
    )
}