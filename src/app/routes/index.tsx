import { Route } from "react-router-dom";
import { Dashboard } from "../pages"
import { useContextUsuarioLogged } from "../shared/hooks";
import { Roteamento } from "./Roteamento";

export const Rota = () => {

    const usuarioLoggedContext = useContextUsuarioLogged();

    if (!usuarioLoggedContext.token)
        return <Roteamento defaultPage="/login" ><></></Roteamento>

    return (
        <Roteamento defaultPage="/dashboard">
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lista" element={<Dashboard />} />
        </Roteamento>
    )
}