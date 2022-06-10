import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { minWidth } from "@mui/system";
import { useModalCustomTheme } from "../../hooks";
import { IAppThemeProps } from "../../shared/hooks";
import { SettingCustom } from "./SettingsCustom";


interface ICustomThemeProps {
    open: boolean
    initialValue: IAppThemeProps;
    onClose: (themeProps?: IAppThemeProps) => void;
}

export const ModalCustomTheme = ({
    open,
    onClose,
    initialValue
}: ICustomThemeProps) => {

    const atualTheme = useTheme();
    const smDown = useMediaQuery(atualTheme.breakpoints.down('sm'));

    const {
        customTheme,
        customThemeProps
    } = useModalCustomTheme(initialValue);

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onClose(customThemeProps);
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

            <DialogContent dividers sx={{height: 500}}>
                <Stack
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={2}
                    direction={{ xs: "column-reverse", sm: "row" }}
                    height={'100%'}
                >
                    <Box
                        flex={1}
                        padding={2}
                        overflow={'auto'}
                        component={Paper}
                    >
                        <SettingCustom />
                    </Box>

                    <Box
                        flex={2}
                        padding={2}
                        overflow={'auto'}
                        component={Paper}
                    >

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