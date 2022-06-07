import { Button } from "@mui/material";
import { FerramentasListagem } from "../../shared/components";
import { useContextUsuarioLogged } from "../../shared/context";
import { LayoutBasePaginas } from "../../shared/layout";

export const Dashboard = () => {

    const { setToken } = useContextUsuarioLogged();

    return (
        <LayoutBasePaginas titulo="Dashboard" barraFerramentas={<FerramentasListagem inputBuscaVisible/>}>

            <Button variant="contained" color="primary" type="button" onClick={() => setToken(null)}>Sair</Button>
        </LayoutBasePaginas>
    )
}