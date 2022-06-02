import { Padding } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useAppDrawerContext, useAppThemeContext, useContextUsuarioLogged } from "../../shared/context";

export const Dashboard = () => {

    const { setToken } = useContextUsuarioLogged();

    const { toggleTheme } = useAppThemeContext();
    
    const { toggleDrawer } = useAppDrawerContext();

    return (
        <div style={{padding: '20px'}}>
            <Button variant="outlined" onClick={() => toggleTheme()}>Toggle Theme</Button>
            <Button variant="outlined" onClick={() => toggleDrawer()}>Toggle Drawer</Button>

            <Button variant="contained" color="primary" type="button" onClick={() => setToken(null)}>Sair</Button>
        </div>
    )
}