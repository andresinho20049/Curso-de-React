import { MenuLateral } from "../shared/components";
import { AppDrawerProvider, useContextUsuarioLogged } from "../shared/context"
import { Roteamento } from "./Roteamento";
import { RoteamentoPrivado } from "./RoteamentoPrivado";

export const Rotas = () => {
    const { token } = useContextUsuarioLogged();

    if (token === null)
        return <Roteamento />

    return (
        <AppDrawerProvider>
            <MenuLateral>
                <RoteamentoPrivado />
            </MenuLateral>
        </AppDrawerProvider>
    )
}