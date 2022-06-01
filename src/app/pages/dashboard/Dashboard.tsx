import { Button } from "@mui/material";
import { useAppThemeContext } from "../../shared/context/ThemeContext";
import { useContextUsuarioLogged } from "../../shared/hooks";

export const Dashboard = () => {

    const { setToken } = useContextUsuarioLogged();

    const { toggleTheme } = useAppThemeContext();

    return (
        <div>
            <Button variant="outlined" onClick={() => toggleTheme()}>Toggle Theme</Button>

            <Button variant="contained" color="primary" type="button" onClick={() => setToken(null)}>Sair</Button>
        </div>
    )
}