import { useContext } from "react"
import { UsuarioLoggedContext } from "../context/UsuarioLogged";


export const useUsuarioLogged = () => {
    const context = useContext(UsuarioLoggedContext);
    return context;
}