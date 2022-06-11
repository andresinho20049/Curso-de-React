import { useCallback, useState } from "react";
import { useAppThemeContext } from "../context";

export const useCustomTheme = () => {

    const [isOpenCustomTheme, setIsOpenCustomTheme] = useState(false);
    const { themeName, setThemeName, customTheme } = useAppThemeContext();

    const selectDarkTheme = useCallback(() => {
        setThemeName("dark");
    }, []);

    const selectLightTheme = useCallback(() => {
        setThemeName("light");
    }, []);

    const selectCustomTheme = useCallback(() => {
        setThemeName("custom");
    }, []);


    const openDialogCustomTheme = useCallback(() => {
        setIsOpenCustomTheme(true);
    }, []);

    const onCloseDialogCustomTheme = useCallback(() => {
        setIsOpenCustomTheme(false)
    }, []);


    return {
        themeName,

        customTheme,
        existsCustomTheme: !!customTheme,

        selectDarkTheme,
        selectLightTheme,
        selectCustomTheme,

        isOpenCustomTheme,
        openDialogCustomTheme,
        onCloseDialogCustomTheme,

    }
}