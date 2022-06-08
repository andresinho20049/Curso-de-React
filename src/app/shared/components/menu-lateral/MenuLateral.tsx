import { Avatar, Box, Divider, Drawer, List, useMediaQuery, useTheme } from "@mui/material"
import { ReactNode } from "react";
import { useAppDrawerContext, useAppThemeContext, useContextAuthentication } from "../../context";
import { ButtonItemDrawerApp, ToggleButtonDrawer } from "./ButtonItemDrawerApp";

interface IMenuLateralProps {
    children: ReactNode
}

export const MenuLateral = ({ children }: IMenuLateralProps) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { toggleTheme } = useAppThemeContext();
    const { logout } = useContextAuthentication();
    const { drawerOpen, toggleDrawer, drawerOptions } = useAppDrawerContext();

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
                        <ToggleButtonDrawer onClick={toggleTheme} />
                        <ButtonItemDrawerApp to="/login" icone="logout" onClick={logout}>
                            Logout
                        </ButtonItemDrawerApp>
                    </Box>

                </Box>
            </Drawer>
            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)} bgcolor={theme.palette.background.default}>
                {children}
            </Box>
        </>
    );
};