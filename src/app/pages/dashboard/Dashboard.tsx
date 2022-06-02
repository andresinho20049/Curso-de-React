import { Button } from "@mui/material";
import { useAppDrawerContext } from "../../shared/context";
import { useAppThemeContext } from "../../shared/context/ThemeContext";
import { useContextUsuarioLogged } from "../../shared/hooks";

export const Dashboard = () => {

    const { setToken } = useContextUsuarioLogged();

    const { toggleTheme } = useAppThemeContext();

    
    const { toggleDrawer } = useAppDrawerContext();

    return (
        <div>
            <Button variant="outlined" onClick={() => toggleTheme()}>Toggle Theme</Button>
            <Button variant="outlined" onClick={() => toggleDrawer()}>Toggle Drawer</Button>

            <Button variant="contained" color="primary" type="button" onClick={() => setToken(null)}>Sair</Button>
        </div>
    )
}