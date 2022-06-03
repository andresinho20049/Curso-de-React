import { Button } from "@mui/material";
import { useAppDrawerContext, useAppThemeContext, useContextUsuarioLogged } from "../../shared/context";
import { LayoutBasePaginas } from "../../shared/layout";

export const Dashboard = () => {

    const { setToken } = useContextUsuarioLogged();
    
    const { toggleDrawer } = useAppDrawerContext();

    return (
        <LayoutBasePaginas titulo="Dashboard" barraFerramentas={<></>}>
            <Button variant="outlined" onClick={() => toggleDrawer()}>Toggle Drawer</Button>

            <Button variant="contained" color="primary" type="button" onClick={() => setToken(null)}>Sair</Button>
        </LayoutBasePaginas>
    )
}