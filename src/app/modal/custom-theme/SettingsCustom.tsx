import { Divider, Grid, ThemeOptions, Tooltip } from "@mui/material";
import { FormHandles, Scope } from "@unform/core";
import { Form } from "@unform/web";
import { RefObject, useCallback, useEffect } from "react";
import { getListPalette } from "../../hooks";
import { AccordionApp, BoxAppLabel, VTextField } from "../../shared/components";
import { VSelectLabel } from "../../shared/components/forms/VSelectLabel";
import { VSwitch } from "../../shared/components/forms/VSwitch";
import { useModalCustomThemeContext } from "../../shared/context";
import { useDobounce } from "../../shared/hooks";

const listFontsFamily = [
    { label: "serif", value: "serif" },
    { label: "sans-serif", value: "sans-serif" },
    { label: "cursive", value: "cursive" },
    { label: "fantasy", value: "fantasy" },
    { label: "monospace", value: "monospace" },
    { label: "Roboto", value: "Roboto" },
    { label: "Helvetica", value: "Helvetica" },
    { label: "Arial", value: "Arial" },
]

interface ISettingCustomProps {
    formRef: RefObject<FormHandles>;
}

export const SettingCustom = ({
    formRef
}: ISettingCustomProps) => {

    const { debounce } = useDobounce()
    const { applyTheme, customThemeProps, setCustomThemeProps } = useModalCustomThemeContext();
    const listPaletteItens = getListPalette();

    useEffect(() => {
        console.log('openSetting', customThemeProps)
        formRef.current?.setData(customThemeProps);
    }, [])

    const handleChange = useCallback(() => {
        debounce(() => {
            const data = formRef.current?.getData()
            setCustomThemeProps(data as ThemeOptions);
        })
    }, [])

    return (
        <Form ref={formRef} onChange={handleChange} onSubmit={(data) => applyTheme(data)}>

            <Grid container spacing={2}>
                <Tooltip title={`
                        Obs.: Valores customizados não são alterados na troca de estilo.
                    `}>
                    <Grid item xs={12}>
                        <VSwitch name="palette.mode" />
                    </Grid>
                </Tooltip>

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item container>

                    <BoxAppLabel label="Typografia" >
                        <Grid container spacing={1}>

                            <Scope path="typography.allVariants">
                                <Grid item xs={12}>
                                    <VSelectLabel label="Font Family" name="fontFamily" options={listFontsFamily} />
                                </Grid>

                                <Grid item xs={12}>
                                    <VTextField name={'color'} fullWidth label={'Color'} type='color' />
                                </Grid>
                            </Scope>

                        </Grid>
                    </BoxAppLabel>

                </Grid>

                <Grid item container>

                    <BoxAppLabel label="Palette" >
                        <Scope path="palette">

                            {listPaletteItens.map((palette) => (
                                <AccordionApp key={palette.title} title={palette.title}>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            {palette.listElement.map((attr => (
                                                <Grid item xs={palette.listElement.length > 1 ? 6 : 12}>
                                                    <VTextField name={attr.path} fullWidth label={attr.label} type='color' />
                                                </Grid>
                                            )))}
                                        </Grid>
                                    </Grid>
                                </AccordionApp>
                            ))}
                        </Scope>
                    </BoxAppLabel>

                </Grid>

            </Grid>
        </Form>
    )
}