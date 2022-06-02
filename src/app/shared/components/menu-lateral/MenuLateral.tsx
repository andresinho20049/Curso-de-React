import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material"
import { Box } from "@mui/system";
import { ReactNode } from "react";
import { useAppDrawerContext } from "../../context";

interface IMenuLateralProps {
    children: ReactNode
}

export const MenuLateral = ({ children }: IMenuLateralProps) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { drawerOpen, toggleDrawer } = useAppDrawerContext();

    return (
        <>
            <Drawer open={drawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawer}>
                <Box width={theme.spacing(28)} display='flex' flexDirection='column' height='100%'>
                    <Box width='100%' height={theme.spacing(20)} display='flex' justifyContent='center' alignItems='center'>
                        <Avatar
                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                            src="https://www.pngplay.com/wp-content/uploads/12/Joker-2019-Background-PNG-Clip-Art-Image.png" />
                    </Box>

                    <Divider />

                    <Box flex={1}>
                        <List component='nav'>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Icon>home</Icon>
                                </ListItemIcon>
                                <ListItemText>
                                    Pagina inicial
                                </ListItemText>
                            </ListItemButton>
                        </List>

                    </Box>

                </Box>
            </Drawer>
            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>
    );
};