import { useContext } from "react"
import { UsuarioLoggedContext } from "../context"


export const useUsuarioLogged = () => {
    const context = useContext(UsuarioLoggedContext);
    return context;
}