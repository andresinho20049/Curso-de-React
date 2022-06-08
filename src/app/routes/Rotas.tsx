import { AppDrawerProvider, DialogConfirmAppProvider, useContextAuthentication } from "../shared/context"
import { Roteamento } from "./Roteamento";
import { RoteamentoPrivado } from "./RoteamentoPrivado";

export const Rotas = () => {
    const { isAuthenticated } = useContextAuthentication();

    if (!isAuthenticated)
        return <Roteamento />

    return (
        <DialogConfirmAppProvider>
            <AppDrawerProvider>
                <RoteamentoPrivado />
            </AppDrawerProvider>
        </DialogConfirmAppProvider>
    )
}