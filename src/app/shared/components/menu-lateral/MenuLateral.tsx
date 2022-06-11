import { Avatar, Box, Divider, Drawer, List, useMediaQuery, useTheme } from "@mui/material";
import { ReactNode } from "react";
import { ModalCustomTheme } from "../../../modal";
import { ModalCustomThemeProvider, useAppDrawerContext, useContextAuthentication } from "../../context";
import { useCustomTheme } from "../../hooks";
import { ButtonItemDrawerApp } from "./ButtonItemDrawerApp";
import { IMenuOptionProps, MenuExpansivoApp } from "./MenuExpansivoApp";

interface IMenuLateralProps {
    children: ReactNode
}

export const MenuLateral = ({ children }: IMenuLateralProps) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { logout } = useContextAuthentication();
    const { drawerOpen, toggleDrawer, drawerOptions } = useAppDrawerContext();

    const {
        themeName,

        existsCustomTheme,

        selectDarkTheme,
        selectLightTheme,
        selectCustomTheme,

        isOpenCustomTheme,
        openDialogCustomTheme,
        onCloseDialogCustomTheme,

    } = useCustomTheme();

    const optionsMenuTheme: IMenuOptionProps[] = [
        { text: "dark", onClick: () => selectDarkTheme() },
        { text: "light", onClick: () => selectLightTheme() },
        { text: "custom", onClick: () => selectCustomTheme(), dividerAfter: true, disabled: !existsCustomTheme },
        { text: "Config Custom", onClick: () => openDialogCustomTheme() },
    ]

    return (
        <>
            <Drawer open={drawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawer}>
                <Box width={theme.spacing(28)} display='flex' flexDirection='column' height='100%'>
                    <Box width='100%' height={theme.spacing(20)} display='flex' justifyContent='center' alignItems='center'>
                        <Avatar
                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                            src="https://www.pngmart.com/files/11/Internet-Hacker-PNG-Clipart.png" />
                    </Box>

                    <Divider />

                    <Box flex={1}>
                        <List component='nav'>
                            {drawerOptions.map(dp => (
                                <ButtonItemDrawerApp key={dp.path} to={dp.path} icone={dp.icon} onClick={smDown ? toggleDrawer : undefined}>
                                    {dp.label}
                                </ButtonItemDrawerApp>
                            ))}
                        </List>

                    </Box>
                    <Box>

                        <MenuExpansivoApp
                            iconMenu="dark_mode"
                            textMenu="Alterar tema"
                            selected={themeName}
                            options={optionsMenuTheme}
                        />

                        <ButtonItemDrawerApp to="/login" icone="logout" onClick={logout}>
                            Logout
                        </ButtonItemDrawerApp>
                    </Box>

                </Box>
            </Drawer>
            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)} bgcolor={theme.palette.background.default}>
                {children}
            </Box>

            <ModalCustomThemeProvider>
                <ModalCustomTheme
                    open={isOpenCustomTheme}
                    onClose={onCloseDialogCustomTheme}
                />
            </ModalCustomThemeProvider>
        </>
    );
};