import { useContext } from "react"
import { UsuarioLoggedContext } from "../context"


export const useContextUsuarioLogged = () => {
    const context = useContext(UsuarioLoggedContext);
    return context;
}