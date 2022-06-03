import { Button } from "@mui/material";
import { FerramentasListagem } from "../../shared/components";
import { useAppDrawerContext, useContextUsuarioLogged } from "../../shared/context";
import { LayoutBasePaginas } from "../../shared/layout";

export const Dashboard = () => {

    const { setToken } = useContextUsuarioLogged();
    
    const { toggleDrawer } = useAppDrawerContext();

    return (
        <LayoutBasePaginas titulo="Dashboard" barraFerramentas={<FerramentasListagem inputBuscaVisible/>}>
            <Button variant="outlined" onClick={() => toggleDrawer()}>Toggle Drawer</Button>

            <Button variant="contained" color="primary" type="button" onClick={() => setToken(null)}>Sair</Button>
        </LayoutBasePaginas>
    )
}