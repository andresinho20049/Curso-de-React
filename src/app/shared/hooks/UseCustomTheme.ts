import { createTheme, useTheme } from "@mui/material";
import { useCallback, useMemo, useRef, useState } from "react";
import { useAppThemeContext } from "../context";
import usePersistedState from "./UsePersistedState";

export interface IAppThemeProps {
    palette: {
        mode: 'dark' | 'light',
        primary: {
            main: string,
            contrastText: string
        },
        secondary: {
            main: string,
            contrastText: string
        },
        error: {
            main: string
        },
        warning: {
            main: string
        },
        info: {
            main: string
        },
        success: {
            main: string
        },
        background: {
            default: string
            paper: string
        },
        action: {
            active: string
        }
    },
    typography: {
        allVariants: {
            fontFamily: "sans-serif" | "serif" | "cursive" | "fantasy" | "monospace" | "Roboto",
            fontWeight: "normal" | "lighter" | "bold",
            color: string
        }
    }
}

export const useCustomTheme = () => {

    const atualTheme = useTheme<IAppThemeProps>();

    const { themeName, setThemeName } = useAppThemeContext();
    const [isOpenCustomTheme, setIsOpenCustomTheme] = useState(false);
    const [customTheme, setCustomTheme] = usePersistedState<IAppThemeProps | null>('customTheme', null);


    const selectDarkTheme = useCallback(() => {
        setThemeName("dark");
    }, []);

    const selectLightTheme = useCallback(() => {
        setThemeName("light");
    }, []);

    const selectCustomTheme = useCallback(() => {
        setThemeName("custom");
    }, []);

    const propsCustomTheme = useRef({} as IAppThemeProps);
    useMemo(() => {

        if (!customTheme) {
            propsCustomTheme.current = atualTheme;
        } else {
            propsCustomTheme.current = customTheme;
        }

    }, [customTheme]);

    const getCustomTheme = useCallback(() => {
        return createTheme(propsCustomTheme.current);
    }, []);


    const openDialogCustomTheme = useCallback(() => {
        setIsOpenCustomTheme(true);
    }, []);

    const onCloseDialogCustomTheme = useCallback((themeProps?: IAppThemeProps) => {
        setIsOpenCustomTheme(false)
        if (!themeProps) return;

        applyCustomTheme(themeProps);
    }, []);

    const applyCustomTheme = useCallback((themeProps: IAppThemeProps) => {
        setCustomTheme(themeProps);
        setThemeName("custom");
    }, []);


    return {
        themeName,

        getCustomTheme,
        propsCustomTheme: propsCustomTheme.current,
        existsCustomTheme: !!customTheme,

        selectDarkTheme,
        selectLightTheme,
        selectCustomTheme,

        isOpenCustomTheme,
        openDialogCustomTheme,
        onCloseDialogCustomTheme,

    }
}