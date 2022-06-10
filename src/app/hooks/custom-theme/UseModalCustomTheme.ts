import { createTheme } from "@mui/material";
import { useMemo, useState } from "react";
import { IAppThemeProps } from "../../shared/hooks";


export const useModalCustomTheme = (initialValue: IAppThemeProps) => {

    const [customThemeProps, setCustomThemeProps] = useState(initialValue);

    const customTheme = useMemo(() => {

        return createTheme(customThemeProps);

    }, [customThemeProps])


    return {
        customTheme,
        customThemeProps
    }
}