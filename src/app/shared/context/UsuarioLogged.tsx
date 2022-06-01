import { createContext, ReactNode } from "react";
import useStorage from "../services/storage/useStorage";

interface IUsuarioLoggedData {
    token: string | null
    setToken: (newToken: string | null) => void
}

export const UsuarioLoggedContext = createContext({} as IUsuarioLoggedData);


interface IUsuarioLoggedProviderProps {
    children: ReactNode
}

export const UsuarioLoggedProvider = ({ children} : IUsuarioLoggedProviderProps) => {
    const [token, setToken] = useStorage(null);

    return (
        <UsuarioLoggedContext.Provider value={{token, setToken}}>
            {children}
        </UsuarioLoggedContext.Provider>
    )
}