import { Button } from "@mui/material";
import { FerramentasDetalhe, FerramentasListagem } from "../../shared/components";
import { useAppDrawerContext, useContextUsuarioLogged } from "../../shared/context";
import { LayoutBasePaginas } from "../../shared/layout";

export const Dashboard2 = () => {

    const { setToken } = useContextUsuarioLogged();
    
    const { toggleDrawer } = useAppDrawerContext();

    return (
        <LayoutBasePaginas titulo="Dashboard" barraFerramentas={<FerramentasDetalhe isVisibleBtnSalvaVoltar />}>
            Dash 2
        </LayoutBasePaginas>
    )
}