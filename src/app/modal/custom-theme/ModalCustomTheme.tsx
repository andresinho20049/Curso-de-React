import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack, ThemeProvider, useMediaQuery, useTheme } from "@mui/material";
import { FormHandles } from "@unform/core";
import { useRef } from "react";
import { useModalCustomThemeContext } from '../../shared/context';
import { PreviewCustom } from "./PreviewCustom";
import { SettingCustom } from "./SettingsCustom";


interface ICustomThemeProps {
    open: boolean
    onClose: () => void;
}

export const ModalCustomTheme = ({
    open,
    onClose
}: ICustomThemeProps) => {

    const atualTheme = useTheme();
    const smDown = useMediaQuery(atualTheme.breakpoints.down('sm'));

    const formRef = useRef<FormHandles>(null);
    const { theme } = useModalCustomThemeContext();

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        formRef.current?.submitForm();
        onClose();
    };

    return (
        <Dialog
            // sx={{ '& .MuiDialog-paper': { maxHeight: { sm: '90vh' } } }}
            fullWidth={!smDown}
            fullScreen={smDown}
            maxWidth="lg"
            open={open}
        >

            <DialogTitle>Customizar Tema</DialogTitle>

            <DialogContent dividers sx={{ height: 500 }}>
                <Stack
                    spacing={2}
                    height={'100%'}
                    alignItems="stretch"
                    justifyContent="space-between"
                    direction={{ xs: "column-reverse", sm: "row" }}
                >
                    <Box
                        flex={1}
                        padding={2}
                        overflow={'auto'}
                        component={Paper}
                    >
                        <SettingCustom formRef={formRef}/>
                    </Box>

                    <Box
                        flex={2}
                        padding={2}
                        overflow={'auto'}
                        component={Paper}
                        variant={'outlined'}
                    >
                        <ThemeProvider theme={theme}>
                            <PreviewCustom />
                        </ThemeProvider>
                    </Box>
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button variant="outlined" sx={{ minWidth: 120 }} color="secondary" autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="outlined" sx={{ minWidth: 120 }} onClick={handleOk}>Ok</Button>
            </DialogActions>

        </Dialog>
    )
}